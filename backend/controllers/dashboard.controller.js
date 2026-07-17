const Job = require('../models/Job');
const Application = require('../models/Application');
const Interview = require('../models/Interview');
const Candidate = require('../models/Candidate');
const Employer = require('../models/Employer');
const Company = require('../models/Company');
const User = require('../models/User');

class DashboardController {
  /**
   * Get main counters and KPIs according to the logged in user's role
   */
  async getStats(req, res, next) {
    try {
      const userId = req.user._id;
      const userRole = req.user.role?.name || 'guest';

      let stats = {};

      if (userRole === 'candidate') {
        const candidate = await Candidate.findOne({ user: userId });
        const candidateId = candidate?._id;

        const [totalApps, shortlisted, interviews] = await Promise.all([
          Application.countDocuments({ candidate: candidateId }),
          Application.countDocuments({ candidate: candidateId, status: 'shortlisted' }),
          Interview.countDocuments({ candidate: candidateId, status: 'scheduled' }),
        ]);

        stats = {
          totalApplications: totalApps,
          shortlistedCount: shortlisted,
          upcomingInterviews: interviews,
          profileCompletion: candidate?.completionScore || 0,
        };
      } else if (['employer', 'recruiter'].includes(userRole)) {
        const [totalJobs, activeJobs, totalApps, scheduledInterviews] = await Promise.all([
          Job.countDocuments({ employer: userId }),
          Job.countDocuments({ employer: userId, status: 'published' }),
          Application.countDocuments({
            job: { $in: await Job.find({ employer: userId }).distinct('_id') },
          }),
          Interview.countDocuments({ employer: userId, status: 'scheduled' }),
        ]);

        stats = {
          totalJobs,
          activeJobs,
          totalApplications: totalApps,
          upcomingInterviews: scheduledInterviews,
        };
      } else if (['admin', 'super_admin'].includes(userRole)) {
        const [totalUsers, totalJobs, totalApps, totalCompanies] = await Promise.all([
          User.countDocuments(),
          Job.countDocuments(),
          Application.countDocuments(),
          Company.countDocuments(),
        ]);

        stats = {
          totalUsers,
          totalJobs,
          totalApplications: totalApps,
          totalCompanies,
        };
      }

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve dynamic activity list (e.g. applications, jobs posted)
   */
  async getRecentActivity(req, res, next) {
    try {
      const userId = req.user._id;
      const userRole = req.user.role?.name || 'guest';

      let activities = [];

      if (userRole === 'candidate') {
        const candidate = await Candidate.findOne({ user: userId });
        activities = await Application.find({ candidate: candidate?._id })
          .populate('job', 'title')
          .sort({ updatedAt: -1 })
          .limit(5);
      } else if (['employer', 'recruiter'].includes(userRole)) {
        const jobs = await Job.find({ employer: userId }).distinct('_id');
        activities = await Application.find({ job: { $in: jobs } })
          .populate('job', 'title')
          .populate({
            path: 'candidate',
            populate: { path: 'user', select: 'firstName lastName' },
          })
          .sort({ updatedAt: -1 })
          .limit(5);
      } else {
        // Admin
        activities = await Job.find()
          .populate('company', 'name')
          .sort({ createdAt: -1 })
          .limit(5);
      }

      res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve posted jobs aggregates
   */
  async getJobStats(req, res, next) {
    try {
      const userId = req.user._id;
      const userRole = req.user.role?.name || 'guest';

      const filter = ['admin', 'super_admin'].includes(userRole) ? {} : { employer: userId };

      const jobStats = await Job.aggregate([
        { $match: filter },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);

      res.status(200).json({
        success: true,
        data: jobStats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve application workflow aggregates
   */
  async getApplicationStats(req, res, next) {
    try {
      const userId = req.user._id;
      const userRole = req.user.role?.name || 'guest';

      let filter = {};
      if (userRole === 'candidate') {
        const candidate = await Candidate.findOne({ user: userId });
        filter = { candidate: candidate?._id };
      } else if (['employer', 'recruiter'].includes(userRole)) {
        const jobs = await Job.find({ employer: userId }).distinct('_id');
        filter = { job: { $in: jobs } };
      }

      const appStats = await Application.aggregate([
        { $match: filter },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);

      res.status(200).json({
        success: true,
        data: appStats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve candidate profiles telemetry
   */
  async getCandidateStats(req, res, next) {
    try {
      const totalCandidates = await Candidate.countDocuments();
      const searchableCandidates = await Candidate.countDocuments({ isSearchable: true });

      res.status(200).json({
        success: true,
        data: {
          totalCandidates,
          searchableCandidates,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve company/employer listings counts
   */
  async getEmployerStats(req, res, next) {
    try {
      const totalEmployers = await Employer.countDocuments();
      const totalCompanies = await Company.countDocuments();

      res.status(200).json({
        success: true,
        data: {
          totalEmployers,
          totalCompanies,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve system revenue mock data
   */
  async getRevenueData(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        data: {
          monthlyRevenue: 12500,
          currency: 'USD',
          subscriptionActiveCount: 45,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve notification alerts for the current dashboard
   */
  async getNotifications(req, res, next) {
    try {
      // Handled separately by notifications module, return skeleton
      res.status(200).json({
        success: true,
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve upcoming interview agendas
   */
  async getUpcomingInterviews(req, res, next) {
    try {
      const userId = req.user._id;
      const userRole = req.user.role?.name || 'guest';

      let query = { status: 'scheduled' };
      if (userRole === 'candidate') {
        const candidate = await Candidate.findOne({ user: userId });
        query.candidate = candidate?._id;
      } else if (['employer', 'recruiter'].includes(userRole)) {
        query.employer = userId;
      }

      const interviews = await Interview.find(query)
        .populate('job', 'title')
        .populate({
          path: 'candidate',
          populate: { path: 'user', select: 'firstName lastName email' },
        })
        .sort({ 'schedule.date': 1 })
        .limit(5);

      res.status(200).json({
        success: true,
        data: interviews,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
