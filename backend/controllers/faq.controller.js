const FAQ = require('../models/FAQ');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

class FAQController {
  /**
   * Retrieve list of FAQs
   */
  async getAllFAQs(req, res, next) {
    try {
      const { category, search, all } = req.query;
      const query = {};

      // If 'all' is true and user is admin, allow viewing inactive FAQs
      const isAdmin = req.user && ['admin', 'super_admin'].includes(req.user.role?.name);
      if (!all || !isAdmin) {
        query.isActive = true;
      }

      if (category) {
        query.category = category;
      }

      if (search) {
        query.$or = [
          { question: { $regex: search, $options: 'i' } },
          { answer: { $regex: search, $options: 'i' } },
        ];
      }

      const faqs = await FAQ.find(query).sort({ order: 1, createdAt: 1 });

      res.status(200).json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve single FAQ by ID
   */
  async getFAQById(req, res, next) {
    try {
      const { id } = req.params;
      const faq = await FAQ.findById(id);

      if (!faq) {
        throw new NotFoundError('FAQ not found');
      }

      res.status(200).json({
        success: true,
        data: faq,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new FAQ (Admin/Super Admin only)
   */
  async createFAQ(req, res, next) {
    try {
      const { question, answer, category, order, isActive } = req.body;

      if (!question || !answer) {
        throw new BadRequestError('Question and answer are required');
      }

      const faq = await FAQ.create({
        question,
        answer,
        category: category || 'General',
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      });

      logger.info(`FAQ created: ${faq._id}`);

      res.status(201).json({
        success: true,
        message: 'FAQ created successfully',
        data: faq,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing FAQ (Admin/Super Admin only)
   */
  async updateFAQ(req, res, next) {
    try {
      const { id } = req.params;
      const faq = await FAQ.findById(id);

      if (!faq) {
        throw new NotFoundError('FAQ not found');
      }

      const fieldsToUpdate = ['question', 'answer', 'category', 'order', 'isActive'];
      fieldsToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
          faq[field] = req.body[field];
        }
      });

      await faq.save();
      logger.info(`FAQ updated: ${faq._id}`);

      res.status(200).json({
        success: true,
        message: 'FAQ updated successfully',
        data: faq,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete FAQ (Admin/Super Admin only)
   */
  async deleteFAQ(req, res, next) {
    try {
      const { id } = req.params;
      const faq = await FAQ.findById(id);

      if (!faq) {
        throw new NotFoundError('FAQ not found');
      }

      await faq.deleteOne();
      logger.info(`FAQ deleted: ${id}`);

      res.status(200).json({
        success: true,
        message: 'FAQ deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FAQController();
