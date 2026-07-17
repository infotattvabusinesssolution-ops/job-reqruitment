const Application = require('../models/Application');
const Job = require('../models/Job');
const Interview = require('../models/Interview');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../utils/errors');
const logger = require('../utils/logger');

class ApplicationController {
  /**
   * List applications based on user roles and filters
   */
  async getAll(req, res, next) {
    try {
      const userId = req.user._id;
      const userRole = req.user.role.name;
      const { status, page = 1, limit = 10 } = req.query;

      const query = {};
      if (status) query.status = status;

      // Role boundaries
      if (userRole === 'candidate') {
        query.user = userId;
      } else if (['employer', 'recruiter'].includes(userRole)) {
        // Find jobs owned/assigned
        const jobs = await Job.find({ employer: userId }).select('_id');
        const jobIds = jobs.map(j => j._id);
        query.job = { $in: jobIds };
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [applications, total] = await Promise.all([
        Application.find(query)
          .populate('job', 'title salary employmentType workMode locations')
          .populate({
            path: 'candidate',
            populate: { path: 'user', select: 'firstName lastName email phone profileImage' },
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Application.countDocuments(query),
      ]);

      res.status(200).json({
        success: true,
        data: {
          applications,
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve single application detail
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      const application = await Application.findById(id)
        .populate('job')
        .populate({
          path: 'candidate',
          populate: { path: 'user', select: 'firstName lastName email phone profileImage' },
        })
        .populate('interviews');

      if (!application) {
        throw new NotFoundError('Application not found');
      }

      // Check access permission
      const isOwner = application.user.toString() === userId.toString();
      const isEmployer = application.job.employer.toString() === userId.toString();
      const isAdmin = ['admin', 'super_admin'].includes(userRole);

      if (!isOwner && !isEmployer && !isAdmin) {
        throw new ForbiddenError('You are not authorized to view this application');
      }

      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update application status (reviewing, shortlisting, hiring)
   */
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, note, reason } = req.body;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      if (!status) {
        throw new BadRequestError('Status is required');
      }

      const application = await Application.findById(id).populate('job');
      if (!application) {
        throw new NotFoundError('Application not found');
      }

      const isEmployer = application.job.employer.toString() === userId.toString();
      const isAdmin = ['admin', 'super_admin'].includes(userRole);

      if (!isEmployer && !isAdmin) {
        throw new ForbiddenError('You are not authorized to update this application status');
      }

      application.status = status;
      application.statusHistory.push({
        status,
        changedBy: userId,
        changedAt: new Date(),
        note: note || `Status updated to ${status}`,
        reason,
      });

      if (status === 'rejected') {
        application.rejection = {
          reason,
          rejectedBy: userId,
          rejectedAt: new Date(),
        };
      }

      await application.save();

      res.status(200).json({
        success: true,
        message: `Application status updated to ${status}`,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add internal comments/notes to application review
   */
  async addNote(req, res, next) {
    try {
      const { id } = req.params;
      const { text, isPrivate = true } = req.body;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      if (!text) {
        throw new BadRequestError('Note text is required');
      }

      const application = await Application.findById(id).populate('job');
      if (!application) {
        throw new NotFoundError('Application not found');
      }

      const isEmployer = application.job.employer.toString() === userId.toString();
      const isAdmin = ['admin', 'super_admin'].includes(userRole);

      if (!isEmployer && !isAdmin) {
        throw new ForbiddenError('You are not authorized to add notes to this application');
      }

      application.notes.push({
        text,
        addedBy: userId,
        addedAt: new Date(),
        isPrivate,
      });

      await application.save();

      res.status(200).json({
        success: true,
        message: 'Note added successfully',
        data: application.notes,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Schedule an interview session
   */
  async scheduleInterview(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      const application = await Application.findById(id).populate('job');
      if (!application) {
        throw new NotFoundError('Application not found');
      }

      const isEmployer = application.job.employer.toString() === userId.toString();
      const isAdmin = ['admin', 'super_admin'].includes(userRole);

      if (!isEmployer && !isAdmin) {
        throw new ForbiddenError('You are not authorized to schedule an interview for this candidate');
      }

      const interviewData = {
        application: application._id,
        job: application.job._id,
        candidate: application.candidate,
        employer: userId,
        type: req.body.type || 'video',
        mode: req.body.mode || 'online',
        title: req.body.title || 'Technical Interview',
        description: req.body.description,
        schedule: {
          date: req.body.date ? new Date(req.body.date) : new Date(Date.now() + 86400000),
          startTime: req.body.startTime || '10:00 AM',
          endTime: req.body.endTime || '11:00 AM',
          duration: req.body.duration || 60,
        },
        location: {
          meetingLink: req.body.meetingLink || 'https://meet.google.com/abc-defg-hij',
        },
        interviewers: req.body.interviewers || [{ name: req.user.fullName, email: req.user.email, isMainInterviewer: true }],
      };

      const interview = await Interview.create(interviewData);

      // Transition application status to interview_scheduled
      application.status = 'interview_scheduled';
      application.statusHistory.push({
        status: 'interview_scheduled',
        changedBy: userId,
        changedAt: new Date(),
        note: `Interview scheduled: ${interview.title}`,
      });
      await application.save();

      res.status(201).json({
        success: true,
        message: 'Interview scheduled successfully',
        data: interview,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Dispatch employment offer letter details
   */
  async sendOffer(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role.name;
      const { salaryProposed, currency = 'USD', startDate, expiresAt, details } = req.body;

      const application = await Application.findById(id).populate('job');
      if (!application) {
        throw new NotFoundError('Application not found');
      }

      const isEmployer = application.job.employer.toString() === userId.toString();
      const isAdmin = ['admin', 'super_admin'].includes(userRole);

      if (!isEmployer && !isAdmin) {
        throw new ForbiddenError('You are not authorized to send offers for this application');
      }

      application.offer = {
        salaryProposed,
        currency,
        startDate: startDate ? new Date(startDate) : new Date(Date.now() + 14 * 24 * 3600000),
        expiresAt: expiresAt ? new Date(expiresAt) : new Date(Date.now() + 7 * 24 * 3600000),
        details,
        sentAt: new Date(),
        response: 'pending',
      };

      application.status = 'offer_sent';
      application.statusHistory.push({
        status: 'offer_sent',
        changedBy: userId,
        changedAt: new Date(),
        note: 'Offer letter details sent to candidate',
      });

      await application.save();

      res.status(200).json({
        success: true,
        message: 'Offer sent successfully',
        data: application.offer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Candidate withdraws their application
   */
  async withdraw(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const application = await Application.findById(id);
      if (!application) {
        throw new NotFoundError('Application not found');
      }

      if (application.user.toString() !== userId.toString()) {
        throw new ForbiddenError('You are not authorized to withdraw this application');
      }

      application.status = 'withdrawn';
      application.statusHistory.push({
        status: 'withdrawn',
        changedBy: userId,
        changedAt: new Date(),
        note: 'Application withdrawn by candidate',
      });

      await application.save();

      res.status(200).json({
        success: true,
        message: 'Application withdrawn successfully',
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ApplicationController();
