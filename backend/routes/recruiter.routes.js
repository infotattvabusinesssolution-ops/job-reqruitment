const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiter.controller');
const { authenticate, authorize } = require('../middlewares/auth');

// All recruiter routes require recruiter or admin authentication
router.use(authenticate);
router.use(authorize('recruiter', 'admin', 'super_admin'));

router.get('/dashboard', recruiterController.getDashboard.bind(recruiterController));
router.get('/assigned-jobs', recruiterController.getAssignedJobs.bind(recruiterController));
router.get('/candidates', recruiterController.getCandidates.bind(recruiterController));
router.get('/pipeline', recruiterController.getPipeline.bind(recruiterController));

module.exports = router;
