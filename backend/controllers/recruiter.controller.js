const Recruiter = require('../models/Recruiter');
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const Application = require('../models/Application');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

class RecruiterController {
  /**
   * Retrieve recruiter dashboard metadata
   */
  async getDashboard(req, res, next) {
    try {
      const userId = req.user._id;

      let recruiter = await Recruiter.findOne({ user: userId });
      if (!recruiter) {
        recruiter = await Recruiter.create({ user: userId });
      }

      const assignedJobsCount = recruiter.assignedJobs?.length || 0;

      const [candidatePoolCount, activePipelineCount] = await Promise.all([
        Candidate.countDocuments({ isSearchable: true }),
        Application.countDocuments({
          status: { $in: ['under_review', 'shortlisted', 'interview_scheduled', 'offer_sent'] },
        }),
      ]);

      res.status(200).json({
        success: true,
        data: {
          assignedJobsCount,
          candidatePoolCount,
          activePipelineCount,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get list of jobs assigned to recruiter
   */
  async getAssignedJobs(req, res, next) {
    try {
      const userId = req.user._id;

      let recruiter = await Recruiter.findOne({ user: userId })
        .populate({
          path: 'assignedJobs',
          populate: { path: 'company', select: 'name logo locations' },
        });

      if (!recruiter) {
        recruiter = await Recruiter.create({ user: userId });
      }

      res.status(200).json({
        success: true,
        data: recruiter.assignedJobs || [],
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Query candidate pool for matching skills/locations
   */
  async getCandidates(req, res, next) {
    try {
      const { search, skill, location, page = 1, limit = 10 } = req.query;

      const query = { isSearchable: true };

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { summary: { $regex: search, $options: 'i' } },
        ];
      }

      if (skill) {
        query['skills.name'] = { $regex: skill, $options: 'i' };
      }

      if (location) {
        query.preferredLocations = { $regex: location, $options: 'i' };
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [candidates, total] = await Promise.all([
        Candidate.find(query)
          .populate('user', 'firstName lastName email profileImage phone')
          .sort({ completionScore: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Candidate.countDocuments(query),
      ]);

      res.status(200).json({
        success: true,
        data: {
          candidates,
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
   * Get dynamic pipeline of candidates grouped by stages
   */
  async getPipeline(req, res, next) {
    try {
      const userId = req.user._id;
      let recruiter = await Recruiter.findOne({ user: userId });
      if (!recruiter) {
        recruiter = await Recruiter.create({ user: userId });
      }

      const jobIds = recruiter.assignedJobs || [];

      // If no jobs assigned, check all applications for simplicity
      const query = jobIds.length > 0 ? { job: { $in: jobIds } } : {};

      const applications = await Application.find(query)
        .populate('job', 'title status')
        .populate({
          path: 'candidate',
          populate: { path: 'user', select: 'firstName lastName email profileImage' },
        })
        .sort({ updatedAt: -1 });

      // Group by status
      const pipeline = {
        applied: [],
        under_review: [],
        shortlisted: [],
        interview: [],
        offer: [],
        hired: [],
        rejected: [],
      };

      applications.forEach(app => {
        const item = {
          id: app._id,
          candidateName: app.candidate?.user ? `${app.candidate.user.firstName} ${app.candidate.user.lastName}` : 'N/A',
          candidateEmail: app.candidate?.user?.email || 'N/A',
          jobTitle: app.job?.title || 'N/A',
          matchScore: app.matchScore || 0,
          updatedAt: app.updatedAt,
        };

        if (['submitted', 'draft'].includes(app.status)) {
          pipeline.applied.push(item);
        } else if (app.status === 'under_review') {
          pipeline.under_review.push(item);
        } else if (app.status === 'shortlisted') {
          pipeline.shortlisted.push(item);
        } else if (['interview_scheduled', 'interviewed'].includes(app.status)) {
          pipeline.interview.push(item);
        } else if (['offer_sent', 'offer_accepted', 'offer_declined'].includes(app.status)) {
          pipeline.offer.push(item);
        } else if (app.status === 'hired') {
          pipeline.hired.push(item);
        } else {
          pipeline.rejected.push(item);
        }
      });

      res.status(200).json({
        success: true,
        data: pipeline,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RecruiterController();
