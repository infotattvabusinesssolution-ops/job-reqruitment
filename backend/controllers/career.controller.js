const Career = require('../models/Career');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

class CareerController {
  /**
   * Retrieve list of Careers
   */
  async getAllCareers(req, res, next) {
    try {
      const { search, all } = req.query;
      const query = {};

      // If 'all' is true and user is admin, allow viewing inactive careers
      const isAdmin = req.user && ['admin', 'super_admin'].includes(req.user.role?.name);
      if (!all || !isAdmin) {
        query.isActive = true;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { dept: { $regex: search, $options: 'i' } },
          { loc: { $regex: search, $options: 'i' } },
        ];
      }

      const careers = await Career.find(query).sort({ order: 1, createdAt: 1 });

      res.status(200).json({
        success: true,
        data: careers,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve single Career by ID
   */
  async getCareerById(req, res, next) {
    try {
      const { id } = req.params;
      const career = await Career.findById(id);

      if (!career) {
        throw new NotFoundError('Career opening not found');
      }

      res.status(200).json({
        success: true,
        data: career,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new Career (Admin/Super Admin only)
   */
  async createCareer(req, res, next) {
    try {
      const { title, dept, loc, exp, salary, order, isActive } = req.body;

      if (!title || !dept || !loc || !exp || !salary) {
        throw new BadRequestError('Title, Department, Location, Experience, and Salary are required');
      }

      const career = await Career.create({
        title,
        dept,
        loc,
        exp,
        salary,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      });

      logger.info(`Career created: ${career._id}`);

      res.status(201).json({
        success: true,
        message: 'Career opening created successfully',
        data: career,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing Career (Admin/Super Admin only)
   */
  async updateCareer(req, res, next) {
    try {
      const { id } = req.params;
      const career = await Career.findById(id);

      if (!career) {
        throw new NotFoundError('Career opening not found');
      }

      const fieldsToUpdate = ['title', 'dept', 'loc', 'exp', 'salary', 'order', 'isActive'];
      fieldsToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
          career[field] = req.body[field];
        }
      });

      await career.save();
      logger.info(`Career updated: ${career._id}`);

      res.status(200).json({
        success: true,
        message: 'Career opening updated successfully',
        data: career,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Career (Admin/Super Admin only)
   */
  async deleteCareer(req, res, next) {
    try {
      const { id } = req.params;
      const career = await Career.findById(id);

      if (!career) {
        throw new NotFoundError('Career opening not found');
      }

      await career.deleteOne();
      logger.info(`Career deleted: ${id}`);

      res.status(200).json({
        success: true,
        message: 'Career opening deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Apply for an internal career or internship opening
   */
  async applyForCareer(req, res, next) {
    try {
      const { name, email, phone, position, coverLetter } = req.body;

      if (!name || !email || !position) {
        throw new BadRequestError('Name, email, and position are required fields');
      }

      const resumeUrl = req.uploadedFiles && req.uploadedFiles[0]?.url;

      const ContactMessage = require('../models/ContactMessage');
      const emailService = require('../utils/emailService');

      // Save to database for admin panel viewing
      await ContactMessage.create({
        fullName: name,
        email,
        phone: phone || '',
        formType: 'career_apply',
        enquiryType: 'Career Application',
        jobPosition: position,
        message: coverLetter || 'Application submitted via Careers page.',
        resumeUrl,
      });

      const hrEmail = process.env.SMTP_USER || 'Hr@geoindialimited.com';

      try {
        await emailService.sendNewApplicationAlert({
          hrEmail,
          candidateName: name,
          candidateEmail: email,
          candidatePhone: phone || 'N/A',
          jobTitle: position,
          coverLetter,
          resumeUrl,
        });
      } catch (err) {
        logger.error('Failed to dispatch Career application HR email alert:', err);
      }

      res.status(200).json({
        success: true,
        message: 'Application submitted successfully! Our HR team will get back to you.',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload Job Seeker profile & resume
   */
  async uploadJobSeekerResume(req, res, next) {
    try {
      const {
        fullName,
        phone,
        email,
        currentLocation,
        preferredLocation,
        highestQualification,
        workExperience,
        currentJobTitle,
        currentSalary,
        expectedSalary,
        noticePeriod,
        preferredIndustry,
        preferredJobRole,
      } = req.body;

      if (!fullName || !email || !phone) {
        throw new BadRequestError('Full Name, Email, and Phone number are required.');
      }

      const resumeUrl = req.uploadedFiles && req.uploadedFiles[0]?.url;

      const ContactMessage = require('../models/ContactMessage');
      const emailService = require('../utils/emailService');

      // Save to database for admin panel viewing
      await ContactMessage.create({
        fullName,
        email,
        phone,
        formType: 'job_seeker',
        enquiryType: 'Job Seeker Resume Upload',
        jobPosition: preferredJobRole || currentJobTitle || 'Job Seeker Profile',
        jobLocation: preferredLocation || currentLocation || '',
        serviceRequired: preferredIndustry || 'Recruitment Support',
        message: `Highest Qualification: ${highestQualification || 'N/A'}\nWork Experience: ${workExperience || 'N/A'}\nCurrent Job Title: ${currentJobTitle || 'N/A'}\nCurrent Salary (LPA): ${currentSalary || 'N/A'}\nExpected Salary (LPA): ${expectedSalary || 'N/A'}\nNotice Period: ${noticePeriod || 'N/A'}\nPreferred Industry: ${preferredIndustry || 'N/A'}\nPreferred Role: ${preferredJobRole || 'N/A'}`,
        resumeUrl,
      });

      const hrEmail = process.env.SMTP_USER || 'Hr@geoindialimited.com';

      try {
        await emailService.sendResumeUploadAlert({
          hrEmail,
          fullName,
          phone,
          email,
          currentLocation,
          preferredLocation,
          highestQualification,
          workExperience,
          currentJobTitle,
          currentSalary,
          expectedSalary,
          noticePeriod,
          preferredIndustry,
          preferredJobRole,
          resumeUrl,
        });
      } catch (err) {
        logger.error('Failed to dispatch JobSeeker resume HR email alert:', err);
      }

      res.status(200).json({
        success: true,
        message: 'Your resume and details have been submitted successfully! Our recruiters will review your profile.',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CareerController();
