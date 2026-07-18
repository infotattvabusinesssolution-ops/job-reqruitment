const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// Public endpoints
router.get('/', optionalAuth, serviceController.getAllServices.bind(serviceController));
router.get('/:id', optionalAuth, serviceController.getServiceById.bind(serviceController));

// Administrative CRUD endpoints
router.post('/', authenticate, authorize('admin', 'super_admin'), serviceController.createService.bind(serviceController));
router.put('/:id', authenticate, authorize('admin', 'super_admin'), serviceController.updateService.bind(serviceController));
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), serviceController.deleteService.bind(serviceController));

module.exports = router;
