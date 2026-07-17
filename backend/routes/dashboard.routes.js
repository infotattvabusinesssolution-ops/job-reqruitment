const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { authenticate } = require('../middlewares/auth');

// All dashboard stats require authentication
router.use(authenticate);

router.get('/stats', dashboardController.getStats.bind(dashboardController));
router.get('/activity', dashboardController.getRecentActivity.bind(dashboardController));
router.get('/job-stats', dashboardController.getJobStats.bind(dashboardController));
router.get('/application-stats', dashboardController.getApplicationStats.bind(dashboardController));
router.get('/candidate-stats', dashboardController.getCandidateStats.bind(dashboardController));
router.get('/employer-stats', dashboardController.getEmployerStats.bind(dashboardController));
router.get('/revenue', dashboardController.getRevenueData.bind(dashboardController));
router.get('/notifications', dashboardController.getNotifications.bind(dashboardController));
router.get('/upcoming-interviews', dashboardController.getUpcomingInterviews.bind(dashboardController));

module.exports = router;
