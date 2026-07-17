const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { authenticate } = require('../middlewares/auth');

// All application routes require authentication
router.use(authenticate);

router.get('/', applicationController.getAll.bind(applicationController));
router.get('/:id', applicationController.getById.bind(applicationController));
router.put('/:id/status', applicationController.updateStatus.bind(applicationController));
router.post('/:id/notes', applicationController.addNote.bind(applicationController));
router.post('/:id/interview', applicationController.scheduleInterview.bind(applicationController));
router.post('/:id/offer', applicationController.sendOffer.bind(applicationController));
router.put('/:id/withdraw', applicationController.withdraw.bind(applicationController));

module.exports = router;
