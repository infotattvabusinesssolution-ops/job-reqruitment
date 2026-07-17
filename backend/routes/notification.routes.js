const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { authenticate } = require('../middlewares/auth');

// All notification endpoints require authentication
router.use(authenticate);

router.get('/', notificationController.getAll.bind(notificationController));
router.get('/unread-count', notificationController.getUnreadCount.bind(notificationController));
router.put('/read-all', notificationController.markAllAsRead.bind(notificationController));
router.put('/:id/read', notificationController.markAsRead.bind(notificationController));
router.delete('/:id', notificationController.deleteNotification.bind(notificationController));

module.exports = router;
