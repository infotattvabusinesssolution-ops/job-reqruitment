const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { authenticate } = require('../middlewares/auth');
const { uploadSingle, uploadResume, uploadImage } = require('../middlewares/upload');

// Enforce authentication for upload tasks
router.use(authenticate);

router.post('/', uploadSingle('file'), uploadController.uploadFile.bind(uploadController));
router.post('/resume', uploadResume, uploadController.uploadResume.bind(uploadController));
router.post('/image', uploadImage, uploadController.uploadImage.bind(uploadController));
router.delete('/:publicId', uploadController.deleteFile.bind(uploadController));

module.exports = router;
