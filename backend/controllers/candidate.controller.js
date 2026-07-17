const Candidate = require('../models/Candidate');
const SavedJob = require('../models/SavedJob');
const Application = require('../models/Application');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

class CandidateController {
  /**
   * Get dynamic profile for candidate
   */
  async getProfile(req, res, next) {
    try {
      const userId = req.user._id;

      let candidate = await Candidate.findOne({ user: userId })
        .populate('user', 'firstName lastName email phone profileImage');

      if (!candidate) {
        // Auto-create candidate profile if not present
        candidate = await Candidate.create({ user: userId });
        candidate = await Candidate.findById(candidate._id).populate('user', 'firstName lastName email phone profileImage');
      }

      res.status(200).json({
        success: true,
        data: candidate,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update candidate profile details
   */
  async updateProfile(req, res, next) {
    try {
      const userId = req.user._id;
      let candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        candidate = await Candidate.create({ user: userId });
      }

      const updatableFields = [
        'title',
        'summary',
        'portfolio',
        'socialLinks',
        'preferences',
        'availability',
        'salaryExpectation',
        'preferredLocations',
        'preferredJobTypes',
        'isSearchable',
      ];

      updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
          candidate[field] = req.body[field];
        }
      });

      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: candidate,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve bookmarked jobs
   */
  async getSavedJobs(req, res, next) {
    try {
      const userId = req.user._id;
      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        return res.status(200).json({ success: true, data: [] });
      }

      const saved = await SavedJob.find({ candidate: candidate._id })
        .populate({
          path: 'job',
          populate: { path: 'company', select: 'name logo locations' },
        });

      res.status(200).json({
        success: true,
        data: saved,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve applications submitted by Candidate
   */
  async getApplications(req, res, next) {
    try {
      const userId = req.user._id;
      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        return res.status(200).json({ success: true, data: [] });
      }

      const applications = await Application.find({ candidate: candidate._id })
        .populate({
          path: 'job',
          populate: { path: 'company', select: 'name logo locations' },
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
   * Upload resume to candidate profile
   */
  async uploadResume(req, res, next) {
    try {
      const userId = req.user._id;
      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      const fileData = req.uploadedFiles?.[0] || req.file;
      if (!fileData) {
        throw new BadRequestError('No file uploaded');
      }

      candidate.resume = {
        url: fileData.url || fileData.path,
        publicId: fileData.publicId || fileData.filename,
        originalName: fileData.originalName || fileData.originalname,
        mimeType: fileData.mimeType || fileData.mimetype,
        size: fileData.size,
      };

      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: candidate.resume,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete resume
   */
  async deleteResume(req, res, next) {
    try {
      const userId = req.user._id;
      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      candidate.resume = undefined;
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Resume deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add professional skill
   */
  async addSkill(req, res, next) {
    try {
      const userId = req.user._id;
      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      const { name, level, yearsOfExperience } = req.body;
      if (!name) {
        throw new BadRequestError('Skill name is required');
      }

      candidate.skills.push({ name, level, yearsOfExperience });
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Skill added successfully',
        data: candidate.skills,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove professional skill
   */
  async removeSkill(req, res, next) {
    try {
      const userId = req.user._id;
      const { skillId } = req.params;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      candidate.skills = candidate.skills.filter(s => s._id.toString() !== skillId);
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Skill removed successfully',
        data: candidate.skills,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add professional experience
   */
  async addExperience(req, res, next) {
    try {
      const userId = req.user._id;
      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      candidate.experience.push(req.body);
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Experience added successfully',
        data: candidate.experience,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update professional experience
   */
  async updateExperience(req, res, next) {
    try {
      const userId = req.user._id;
      const { id } = req.params;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      const exp = candidate.experience.id(id);
      if (!exp) {
        throw new NotFoundError('Experience record not found');
      }

      Object.assign(exp, req.body);
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Experience updated successfully',
        data: candidate.experience,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete professional experience
   */
  async deleteExperience(req, res, next) {
    try {
      const userId = req.user._id;
      const { id } = req.params;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      candidate.experience = candidate.experience.filter(e => e._id.toString() !== id);
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Experience deleted successfully',
        data: candidate.experience,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add academic education
   */
  async addEducation(req, res, next) {
    try {
      const userId = req.user._id;
      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      candidate.education.push(req.body);
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Education added successfully',
        data: candidate.education,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update academic education
   */
  async updateEducation(req, res, next) {
    try {
      const userId = req.user._id;
      const { id } = req.params;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      const edu = candidate.education.id(id);
      if (!edu) {
        throw new NotFoundError('Education record not found');
      }

      Object.assign(edu, req.body);
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Education updated successfully',
        data: candidate.education,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete academic education
   */
  async deleteEducation(req, res, next) {
    try {
      const userId = req.user._id;
      const { id } = req.params;

      const candidate = await Candidate.findOne({ user: userId });
      if (!candidate) {
        throw new NotFoundError('Candidate profile not found');
      }

      candidate.education = candidate.education.filter(e => e._id.toString() !== id);
      candidate.calculateCompletionScore();
      await candidate.save();

      res.status(200).json({
        success: true,
        message: 'Education deleted successfully',
        data: candidate.education,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CandidateController();
