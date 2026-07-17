const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// Public / Search endpoints
router.get('/', optionalAuth, jobController.getAllJobs.bind(jobController));
router.get('/featured', optionalAuth, jobController.getFeaturedJobs.bind(jobController));
router.get('/recent', optionalAuth, jobController.getRecentJobs.bind(jobController));
router.get('/slug/:slug', optionalAuth, jobController.getJobBySlug.bind(jobController));

// Resource endpoints
router.get('/:id', optionalAuth, jobController.getJobById.bind(jobController));
router.post('/', authenticate, authorize('employer', 'admin', 'super_admin'), jobController.createJob.bind(jobController));
router.put('/:id', authenticate, authorize('employer', 'admin', 'super_admin'), jobController.updateJob.bind(jobController));
router.delete('/:id', authenticate, authorize('employer', 'admin', 'super_admin'), jobController.deleteJob.bind(jobController));

// Job sub-resources (actions)
router.get('/:id/similar', optionalAuth, jobController.getSimilarJobs.bind(jobController));
router.post('/:jobId/save', authenticate, jobController.saveJob.bind(jobController));
router.delete('/:jobId/save', authenticate, jobController.unsaveJob.bind(jobController));
router.post('/:jobId/apply', authenticate, jobController.applyJob.bind(jobController));
router.post('/:jobId/share', optionalAuth, jobController.shareJob.bind(jobController));
router.post('/:jobId/report', authenticate, jobController.reportJob.bind(jobController));

module.exports = router;