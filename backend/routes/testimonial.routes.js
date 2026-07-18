const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// Public endpoints
router.get('/', optionalAuth, testimonialController.getAllTestimonials.bind(testimonialController));
router.get('/:id', optionalAuth, testimonialController.getTestimonialById.bind(testimonialController));

// Administrative CRUD endpoints
router.post('/', authenticate, authorize('admin', 'super_admin'), testimonialController.createTestimonial.bind(testimonialController));
router.put('/:id', authenticate, authorize('admin', 'super_admin'), testimonialController.updateTestimonial.bind(testimonialController));
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), testimonialController.deleteTestimonial.bind(testimonialController));

module.exports = router;
