const express = require('express');
const router = express.Router();
const careerController = require('../controllers/career.controller');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');
const { uploadResume } = require('../middlewares/upload');

// Public endpoints
router.get('/', optionalAuth, careerController.getAllCareers.bind(careerController));
router.get('/:id', optionalAuth, careerController.getCareerById.bind(careerController));
router.post('/apply', uploadResume, careerController.applyForCareer.bind(careerController));
router.post('/upload-resume', uploadResume, careerController.uploadJobSeekerResume.bind(careerController));

// Administrative CRUD endpoints
router.post('/', authenticate, authorize('admin', 'super_admin'), careerController.createCareer.bind(careerController));
router.put('/:id', authenticate, authorize('admin', 'super_admin'), careerController.updateCareer.bind(careerController));
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), careerController.deleteCareer.bind(careerController));

module.exports = router;
