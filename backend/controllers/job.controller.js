const Job = require('../models/Job');
const Company = require('../models/Company');
const SavedJob = require('../models/SavedJob');
const Application = require('../models/Application');
const Candidate = require('../models/Candidate');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../utils/errors');
const logger = require('../utils/logger');
const slugify = require('slugify');

class JobController {
  /**
   * Get all jobs with filters, pagination, sorting, and search
   */
  async getAllJobs(req, res, next) {
    try {
      const {
        search,
        location,
        employmentType,
        workMode,
        experienceLevel,
        salaryMin,
        salaryMax,
        category,
        skills,
        page = 1,
        limit = 10,
        sortBy = 'newest',
      } = req.query;

      const query = { status: 'published' };

      // Search (title, description, skills)
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { 'skills.name': { $regex: search, $options: 'i' } },
        ];
      }

      // Location
      if (location) {
        query['locations.city'] = { $regex: location, $options: 'i' };
      }

      // Employment Type
      if (employmentType) {
        query.employmentType = employmentType;
      }

      // Work Mode
      if (workMode) {
        query.workMode = workMode;
      }

      // Experience Level
      if (experienceLevel) {
        query.experienceLevel = experienceLevel;
      }

      // Salary Range
      if (salaryMin) {
        query['salary.min'] = { $gte: Number(salaryMin) };
      }
      if (salaryMax) {
        query['salary.max'] = { $lte: Number(salaryMax) };
      }

      // Category
      if (category) {
        query.category = category;
      }

      // Skills
      if (skills) {
        const skillArray = Array.isArray(skills) ? skills : [skills];
        query['skills.name'] = { $in: skillArray };
      }

      // Sorting options
      let sort = { createdAt: -1 };
      if (sortBy === 'oldest') {
        sort = { createdAt: 1 };
      } else if (sortBy === 'salary_high') {
        sort = { 'salary.max': -1 };
      } else if (sortBy === 'salary_low') {
        sort = { 'salary.min': 1 };
      } else if (sortBy === 'views') {
        sort = { views: -1 };
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [jobs, total] = await Promise.all([
        Job.find(query)
          .populate('company', 'name logo locations website')
          .populate('category', 'name icon')
          .sort(sort)
          .skip(skip)
          .limit(Number(limit)),
        Job.countDocuments(query),
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
   * Get single job by ID
   */
  async getJobById(req, res, next) {
    try {
      const { id } = req.params;

      const job = await Job.findById(id)
        .populate('company')
        .populate('category')
        .populate('employer', 'firstName lastName email profileImage');

      if (!job) {
        throw new NotFoundError('Job not found');
      }

      // Increment view count
      job.views += 1;
      await job.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single job by Slug
   */
  async getJobBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const job = await Job.findOne({ slug })
        .populate('company')
        .populate('category')
        .populate('employer', 'firstName lastName email profileImage');

      if (!job) {
        throw new NotFoundError('Job not found');
      }

      // Increment view count
      job.views += 1;
      await job.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new job posting
   */
  async createJob(req, res, next) {
    try {
      const employerId = req.user._id;

      // Find company associated with this employer
      let company = await Company.findOne({ employer: employerId });
      if (!company) {
        // Create a dummy/fallback company if they don't have one yet
        company = await Company.create({
          name: `${req.user.firstName}'s Enterprise`,
          employer: employerId,
          isVerified: false,
        });
      }

      const jobData = {
        ...req.body,
        employer: employerId,
        company: company._id,
        status: req.body.status || 'published',
      };

      const job = await Job.create(jobData);

      // Increment company job count
      company.jobCount += 1;
      await company.save();

      res.status(201).json({
        success: true,
        message: 'Job posting created successfully',
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing job posting
   */
  async updateJob(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      const job = await Job.findById(id);
      if (!job) {
        throw new NotFoundError('Job not found');
      }

      // Authorization check (only owner or admin)
      if (job.employer.toString() !== userId.toString() && !['admin', 'super_admin'].includes(userRole)) {
        throw new ForbiddenError('You are not authorized to update this job');
      }

      // Trigger slug updates if title changes
      if (req.body.title) {
        job.title = req.body.title;
        job.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
      }

      // Update remaining fields
      Object.assign(job, req.body);
      await job.save();

      res.status(200).json({
        success: true,
        message: 'Job posting updated successfully',
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete job posting
   */
  async deleteJob(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      const job = await Job.findById(id);
      if (!job) {
        throw new NotFoundError('Job not found');
      }

      if (job.employer.toString() !== userId.toString() && !['admin', 'super_admin'].includes(userRole)) {
        throw new ForbiddenError('You are not authorized to delete this job');
      }

      await job.deleteOne();

      // Decrement company job count
      const company = await Company.findById(job.company);
      if (company && company.jobCount > 0) {
        company.jobCount -= 1;
        await company.save();
      }

      res.status(200).json({
        success: true,
        message: 'Job posting deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Save (bookmark) a job
   */
  async saveJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const userId = req.user._id;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new BadRequestError('Only candidates can save jobs');
      }

      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }

      const existingSave = await SavedJob.findOne({ candidate: candidate._id, job: jobId });
      if (existingSave) {
        return res.status(200).json({
          success: true,
          message: 'Job already saved',
        });
      }

      await SavedJob.create({
        candidate: candidate._id,
        user: userId,
        job: jobId,
      });

      job.savedCount += 1;
      await job.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: 'Job bookmarked successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Unsave (remove bookmark) a job
   */
  async unsaveJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const userId = req.user._id;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new BadRequestError('Only candidates can unsave jobs');
      }

      const savedRecord = await SavedJob.findOneAndDelete({ candidate: candidate._id, job: jobId });
      if (!savedRecord) {
        throw new NotFoundError('Bookmarked job record not found');
      }

      const job = await Job.findById(jobId);
      if (job && job.savedCount > 0) {
        job.savedCount -= 1;
        await job.save({ validateBeforeSave: false });
      }

      res.status(200).json({
        success: true,
        message: 'Job bookmark removed successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Apply for a job
   */
  async applyJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const userId = req.user._id;
      const { coverLetter, answers } = req.body;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new BadRequestError('Only candidates can apply to jobs');
      }

      const job = await Job.findById(jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }

      if (job.status !== 'published') {
        throw new BadRequestError('Cannot apply to a job that is not published');
      }

      // Check if already applied
      const alreadyApplied = await Application.findOne({ job: jobId, candidate: candidate._id });
      if (alreadyApplied) {
        throw new BadRequestError('You have already applied to this job');
      }

      // Build application object
      const applicationData = {
        job: jobId,
        candidate: candidate._id,
        user: userId,
        coverLetter,
        answers,
        resume: {
          url: candidate.resume?.url || '',
          publicId: candidate.resume?.publicId || '',
          originalName: candidate.resume?.originalName || 'Profile Resume',
        },
      };

      const application = await Application.create(applicationData);

      // Increment counts
      job.applicationCount += 1;
      await job.save({ validateBeforeSave: false });

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get featured jobs
   */
  async getFeaturedJobs(req, res, next) {
    try {
      const jobs = await Job.find({ isFeatured: true, status: 'published' })
        .populate('company', 'name logo locations website')
        .limit(6);

      res.status(200).json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get recent jobs
   */
  async getRecentJobs(req, res, next) {
    try {
      const limit = Number(req.query.limit) || 5;
      const jobs = await Job.find({ status: 'published' })
        .populate('company', 'name logo locations website')
        .sort({ createdAt: -1 })
        .limit(limit);

      res.status(200).json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get similar jobs
   */
  async getSimilarJobs(req, res, next) {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      if (!job) {
        throw new NotFoundError('Job not found');
      }

      const similarJobs = await Job.find({
        status: 'published',
        _id: { $ne: id },
        $or: [
          { category: job.category },
          { 'skills.name': { $in: job.skills.map(s => s.name) } },
        ],
      })
        .populate('company', 'name logo locations website')
        .limit(4);

      res.status(200).json({
        success: true,
        data: similarJobs,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Share a job
   */
  async shareJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const job = await Job.findById(jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }

      job.shareCount += 1;
      await job.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: 'Share counter updated',
        data: { shareCount: job.shareCount },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Report a job
   */
  async reportJob(req, res, next) {
    try {
      // Stub implementation of reporting
      res.status(200).json({
        success: true,
        message: 'Job reported successfully. Our team will look into it.',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new JobController();
