const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middlewares/auth');

// Enforce admin/super_admin authorization for all sub-endpoints
router.use(authenticate);
router.use(authorize('admin', 'super_admin'));

router.get('/users', adminController.getUsers.bind(adminController));
router.get('/users/:id', adminController.getUser.bind(adminController));
router.put('/users/:id', adminController.updateUser.bind(adminController));
router.delete('/users/:id', adminController.deleteUser.bind(adminController));

router.get('/system-stats', adminController.getSystemStats.bind(adminController));
router.get('/audit-logs', adminController.getAuditLogs.bind(adminController));

router.get('/settings', adminController.getSettings.bind(adminController));
router.put('/settings', adminController.updateSettings.bind(adminController));

module.exports = router;
