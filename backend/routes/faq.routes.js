const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// Public endpoints (or optional auth to check if user is admin)
router.get('/', optionalAuth, faqController.getAllFAQs.bind(faqController));
router.get('/:id', optionalAuth, faqController.getFAQById.bind(faqController));

// Administrative CRUD endpoints
router.post('/', authenticate, authorize('admin', 'super_admin'), faqController.createFAQ.bind(faqController));
router.put('/:id', authenticate, authorize('admin', 'super_admin'), faqController.updateFAQ.bind(faqController));
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), faqController.deleteFAQ.bind(faqController));

module.exports = router;
