const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate.controller');
const { authenticate } = require('../middlewares/auth');
const { uploadResume } = require('../middlewares/upload');

// All candidate routes require authentication
router.use(authenticate);

// Profile routes
router.get('/profile', candidateController.getProfile.bind(candidateController));
router.put('/profile', candidateController.updateProfile.bind(candidateController));

// Saved jobs & applications
router.get('/saved-jobs', candidateController.getSavedJobs.bind(candidateController));
router.get('/applications', candidateController.getApplications.bind(candidateController));

// Resume upload/delete
router.post('/upload-resume', uploadResume, candidateController.uploadResume.bind(candidateController));
router.delete('/resume', candidateController.deleteResume.bind(candidateController));

// Skills
router.post('/skills', candidateController.addSkill.bind(candidateController));
router.delete('/skills/:skillId', candidateController.removeSkill.bind(candidateController));

// Experience
router.post('/experience', candidateController.addExperience.bind(candidateController));
router.put('/experience/:id', candidateController.updateExperience.bind(candidateController));
router.delete('/experience/:id', candidateController.deleteExperience.bind(candidateController));

// Education
router.post('/education', candidateController.addEducation.bind(candidateController));
router.put('/education/:id', candidateController.updateEducation.bind(candidateController));
router.delete('/education/:id', candidateController.deleteEducation.bind(candidateController));

module.exports = router;
