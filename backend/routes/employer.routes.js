const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employer.controller');
const { authenticate, authorize } = require('../middlewares/auth');

// Public route for Request Hiring Support SMTP notification
router.post('/hiring-support', employerController.submitHiringRequirement.bind(employerController));

// All employer routes require authentication and employer/admin authorization
router.use(authenticate);
router.use(authorize('employer', 'admin', 'super_admin'));

router.get('/profile', employerController.getProfile.bind(employerController));
router.put('/profile', employerController.updateProfile.bind(employerController));

router.get('/company', employerController.getCompany.bind(employerController));
router.put('/company', employerController.updateCompany.bind(employerController));

router.get('/jobs', employerController.getJobs.bind(employerController));
router.get('/applications', employerController.getApplications.bind(employerController));
router.get('/jobs/:jobId/applicants', employerController.getApplicants.bind(employerController));

module.exports = router;
