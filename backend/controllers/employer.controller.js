const Employer = require('../models/Employer');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../utils/errors');
const logger = require('../utils/logger');

class EmployerController {
  /**
   * Retrieve logged in employer's profile details
   */
  async getProfile(req, res, next) {
    try {
      const userId = req.user._id;

      let employer = await Employer.findOne({ user: userId })
        .populate('user', 'firstName lastName email phone profileImage')
        .populate('company');

      if (!employer) {
        // Auto-create employer profile if not present
        let company = await Company.findOne({ employer: userId });
        if (!company) {
          company = await Company.create({
            name: `${req.user.firstName}'s Enterprise`,
            employer: userId,
          });
        }
        employer = await Employer.create({
          user: userId,
          company: company._id,
        });
        employer = await Employer.findById(employer._id)
          .populate('user', 'firstName lastName email phone profileImage')
          .populate('company');
      }

      res.status(200).json({
        success: true,
        data: employer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update employer designation, department
   */
  async updateProfile(req, res, next) {
    try {
      const userId = req.user._id;
      let employer = await Employer.findOne({ user: userId });
      if (!employer) {
        employer = await Employer.create({ user: userId });
      }

      const { designation, department } = req.body;
      if (designation !== undefined) employer.designation = designation;
      if (department !== undefined) employer.department = department;

      await employer.save();

      res.status(200).json({
        success: true,
        message: 'Employer profile updated successfully',
        data: employer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve company details associated with this employer
   */
  async getCompany(resOrReq, res, next) {
    // Express handler wrapper support
    const req = resOrReq;
    try {
      const userId = req.user._id;

      let company = await Company.findOne({ employer: userId });
      if (!company) {
        company = await Company.create({
          name: `${req.user.firstName}'s Enterprise`,
          employer: userId,
        });
        // Ensure employer profile points to this company
        await Employer.findOneAndUpdate(
          { user: userId },
          { company: company._id },
          { upsert: true }
        );
      }

      res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update company information (locations, website, branding, size)
   */
  async updateCompany(req, res, next) {
    try {
      const userId = req.user._id;
      let company = await Company.findOne({ employer: userId });
      if (!company) {
        company = await Company.create({
          name: req.body.name || `${req.user.firstName}'s Enterprise`,
          employer: userId,
        });
        await Employer.findOneAndUpdate(
          { user: userId },
          { company: company._id },
          { upsert: true }
        );
      }

      const updatableFields = [
        'name',
        'description',
        'shortDescription',
        'industry',
        'companySize',
        'foundedYear',
        'website',
        'phone',
        'email',
        'logo',
        'coverImage',
        'locations',
        'socialMedia',
        'benefits',
        'culture',
        'gallery',
      ];

      updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
          company[field] = req.body[field];
        }
      });

      await company.save();

      res.status(200).json({
        success: true,
        message: 'Company profile updated successfully',
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * List jobs posted by this employer
   */
  async getJobs(req, res, next) {
    try {
      const userId = req.user._id;
      const { status, page = 1, limit = 10 } = req.query;

      const filter = { employer: userId };
      if (status) filter.status = status;

      const skip = (Number(page) - 1) * Number(limit);

      const [jobs, total] = await Promise.all([
        Job.find(filter)
          .populate('category', 'name')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Job.countDocuments(filter),
      ]);

      res.status(200).json({
        success: true,
        data: {
          jobs,
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
   * List candidate applications for jobs owned by this employer
   */
  async getApplications(req, res, next) {
    try {
      const userId = req.user._id;
      const { status } = req.query;

      // Find jobs posted by this employer first
      const jobs = await Job.find({ employer: userId }).select('_id');
      const jobIds = jobs.map(j => j._id);

      const filter = { job: { $in: jobIds } };
      if (status) filter.status = status;

      const applications = await Application.find(filter)
        .populate('job', 'title status applicationDeadline')
        .populate({
          path: 'candidate',
          populate: { path: 'user', select: 'firstName lastName email profileImage phone' },
        })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * List candidate applicants for a specific Job posting
   */
  async getApplicants(req, res, next) {
    try {
      const userId = req.user._id;
      const { jobId } = req.params;

      // Verify ownership
      const job = await Job.findById(jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }

      if (job.employer.toString() !== userId.toString()) {
        throw new ForbiddenError('You are not authorized to view applicants for this job');
      }

      const applications = await Application.find({ job: jobId })
        .populate({
          path: 'candidate',
          populate: { path: 'user', select: 'firstName lastName email profileImage phone' },
        })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Submit hiring requirements via email to admin
   */
  async submitHiringRequirement(req, res, next) {
    try {
      const {
        companyName,
        contactPerson,
        email,
        phone,
        jobPosition,
        vacancies,
        jobLocation,
        qualification,
        experience,
        salaryRange,
        skills,
        employmentType,
        joiningDate,
        jobDescription,
      } = req.body;

      const emailService = require('../utils/emailService');

      // Send email alert to admin
      const hrEmail = process.env.SMTP_USER || 'Hr@geoindialimited.com';
      await emailService.sendHiringRequirementAlert({
        hrEmail,
        companyName,
        contactPerson,
        email,
        phone,
        jobPosition,
        vacancies,
        jobLocation,
        qualification,
        experience,
        salaryRange,
        skills,
        employmentType,
        joiningDate,
        jobDescription,
      });

      res.status(200).json({
        success: true,
        message: 'Hiring requirement submitted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EmployerController();
