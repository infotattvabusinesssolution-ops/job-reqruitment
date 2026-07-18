const Testimonial = require('../models/Testimonial');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

class TestimonialController {
  /**
   * Retrieve list of testimonials
   */
  async getAllTestimonials(req, res, next) {
    try {
      const { search, all, featured } = req.query;
      const query = {};

      const isAdmin = req.user && ['admin', 'super_admin'].includes(req.user.role?.name);
      if (!all || !isAdmin) {
        query.isActive = true;
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { role: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
        ];
      }

      const testimonials = await Testimonial.find(query).sort({ isFeatured: -1, createdAt: -1 });

      res.status(200).json({
        success: true,
        data: testimonials,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve single testimonial by ID
   */
  async getTestimonialById(req, res, next) {
    try {
      const { id } = req.params;
      const testimonial = await Testimonial.findById(id);

      if (!testimonial) {
        throw new NotFoundError('Testimonial not found');
      }

      res.status(200).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new testimonial (Admin/Super Admin only)
   */
  async createTestimonial(req, res, next) {
    try {
      const { name, role, company, content, rating, avatar, isActive, isFeatured } = req.body;

      if (!name || !role || !company || !content) {
        throw new BadRequestError('Name, role, company, and content are required');
      }

      const testimonial = await Testimonial.create({
        name,
        role,
        company,
        content,
        rating: rating !== undefined ? rating : 5,
        avatar: avatar || '',
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      });

      logger.info(`Testimonial created: ${testimonial._id}`);

      res.status(201).json({
        success: true,
        message: 'Testimonial created successfully',
        data: testimonial,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing testimonial (Admin/Super Admin only)
   */
  async updateTestimonial(req, res, next) {
    try {
      const { id } = req.params;
      const testimonial = await Testimonial.findById(id);

      if (!testimonial) {
        throw new NotFoundError('Testimonial not found');
      }

      const fieldsToUpdate = ['name', 'role', 'company', 'content', 'rating', 'avatar', 'isActive', 'isFeatured'];
      fieldsToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
          testimonial[field] = req.body[field];
        }
      });

      await testimonial.save();
      logger.info(`Testimonial updated: ${testimonial._id}`);

      res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        data: testimonial,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete testimonial (Admin/Super Admin only)
   */
  async deleteTestimonial(req, res, next) {
    try {
      const { id } = req.params;
      const testimonial = await Testimonial.findById(id);

      if (!testimonial) {
        throw new NotFoundError('Testimonial not found');
      }

      await testimonial.deleteOne();
      logger.info(`Testimonial deleted: ${id}`);

      res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TestimonialController();
