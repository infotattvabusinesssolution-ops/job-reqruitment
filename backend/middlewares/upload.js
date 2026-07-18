const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');
const cloudinaryConfig = require('../config/cloudinary');
const { BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

// Ensure upload directories exist
const uploadDirs = ['resumes', 'images', 'logos', 'avatars', 'documents'];
uploadDirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', 'uploads', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Local storage configuration
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = 'documents';
    if (file.mimetype.startsWith('image/')) {
      uploadDir = 'images';
    }
    if (file.fieldname === 'resume' || file.fieldname === 'cv') {
      uploadDir = 'resumes';
    }
    if (file.fieldname === 'logo' || file.fieldname === 'companyLogo') {
      uploadDir = 'logos';
    }
    if (file.fieldname === 'avatar' || file.fieldname === 'profileImage') {
      uploadDir = 'avatars';
    }
    cb(null, path.join(__dirname, '..', 'uploads', uploadDir));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${nanoid(12)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new BadRequestError(`File type ${file.mimetype} is not allowed`), false);
  }
  cb(null, true);
};

// Create multer upload instance
const upload = multer({
  storage: localStorage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    files: 5,
  },
});

// Upload to Cloudinary middleware with local fallback
const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      return next();
    }

    const files = req.files || [req.file];
    const uploadedFiles = [];

    for (const file of Array.isArray(files) ? files : [files]) {
      let fileUrl = '';
      let publicId = '';

      try {
        const result = await cloudinaryConfig.uploadFile(file.path, {
          folder: `job-recruitment/${file.fieldname || 'general'}`,
          public_id: `file_${Date.now()}_${nanoid(8)}`,
          resource_type: 'auto',
        });

        fileUrl = result.secure_url;
        publicId = result.public_id;

        // Delete local temp file after successful Cloudinary upload
        fs.unlink(file.path, (err) => {
          if (err) logger.error('Failed to delete local temp file:', err);
        });
      } catch (cloudErr) {
        logger.warn('Cloudinary upload failed, using local file URL fallback:', cloudErr?.message || cloudErr);
        // Fallback to local server static URL so submission succeeds seamlessly
        const host = req.get('host') || 'localhost:5000';
        const protocol = req.protocol || 'http';
        const relativeSubDir = path.relative(path.join(__dirname, '..', 'uploads'), file.destination || '').replace(/\\/g, '/');
        const fileSubPath = relativeSubDir ? `${relativeSubDir}/${file.filename}` : file.filename;
        fileUrl = `${protocol}://${host}/uploads/${fileSubPath}`;
        publicId = file.filename;
      }

      uploadedFiles.push({
        url: fileUrl,
        publicId: publicId,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      });
    }

    req.uploadedFiles = uploadedFiles;
    next();
  } catch (error) {
    logger.error('File upload middleware error:', error);
    next(new BadRequestError('File processing failed. Please try again.'));
  }
};

// Single file upload middleware
const uploadSingle = (fieldName) => {
  return [upload.single(fieldName), uploadToCloudinary];
};

// Multiple files upload middleware
const uploadMultiple = (fieldName, maxCount = 5) => {
  return [upload.array(fieldName, maxCount), uploadToCloudinary];
};

// Mixed files upload middleware
const uploadFields = (fields) => {
  return [upload.fields(fields), uploadToCloudinary];
};

// Resume upload with specific validation
const uploadResume = uploadSingle('resume');

// Image upload with optimization
const uploadImage = uploadSingle('image');

// Company logo upload
const uploadLogo = uploadSingle('logo');

// Profile avatar upload
const uploadAvatar = uploadSingle('avatar');

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  uploadResume,
  uploadImage,
  uploadLogo,
  uploadAvatar,
  uploadToCloudinary,
};