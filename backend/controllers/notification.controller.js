const Notification = require('../models/Notification');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../utils/errors');
const logger = require('../utils/logger');

class NotificationController {
  /**
   * Retrieve recipient notifications
   */
  async getAll(req, res, next) {
    try {
      const userId = req.user._id;
      const { page = 1, limit = 20 } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const [notifications, total] = await Promise.all([
        Notification.find({ recipient: userId, isDeleted: { $ne: true } })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Notification.countDocuments({ recipient: userId, isDeleted: { $ne: true } }),
      ]);

      res.status(200).json({
        success: true,
        data: {
          notifications,
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
   * Mark individual notification as read
   */
  async markAsRead(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const notification = await Notification.findById(id);
      if (!notification) {
        throw new NotFoundError('Notification not found');
      }

      if (notification.recipient.toString() !== userId.toString()) {
        throw new ForbiddenError('You cannot mark this notification as read');
      }

      notification.isRead = true;
      notification.readAt = new Date();
      await notification.save();

      res.status(200).json({
        success: true,
        message: 'Notification marked as read',
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mark all notifications as read for current user
   */
  async markAllAsRead(req, res, next) {
    try {
      const userId = req.user._id;

      await Notification.updateMany(
        { recipient: userId, isRead: false },
        { $set: { isRead: true, readAt: new Date() } }
      );

      res.status(200).json({
        success: true,
        message: 'All notifications marked as read',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a notification
   */
  async deleteNotification(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const notification = await Notification.findById(id);
      if (!notification) {
        throw new NotFoundError('Notification not found');
      }

      if (notification.recipient.toString() !== userId.toString()) {
        throw new ForbiddenError('You cannot delete this notification');
      }

      notification.isDeleted = true;
      await notification.save();

      res.status(200).json({
        success: true,
        message: 'Notification deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get unread notifications count for recipient
   */
  async getUnreadCount(req, res, next) {
    try {
      const userId = req.user._id;

      const count = await Notification.countDocuments({
        recipient: userId,
        isRead: false,
        isDeleted: { $ne: true },
      });

      res.status(200).json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
