const cloudinaryConfig = require('../config/cloudinary');
const { BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

class UploadController {
  /**
   * General file upload
   */
  async uploadFile(req, res, next) {
    try {
      const fileData = req.uploadedFiles?.[0] || req.file;
      if (!fileData) {
        throw new BadRequestError('No file uploaded');
      }

      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          url: fileData.url || fileData.path,
          publicId: fileData.publicId || fileData.filename,
          originalName: fileData.originalName || fileData.originalname,
          size: fileData.size,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Resume PDF upload
   */
  async uploadResume(req, res, next) {
    try {
      const fileData = req.uploadedFiles?.[0] || req.file;
      if (!fileData) {
        throw new BadRequestError('No resume uploaded');
      }

      res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: {
          url: fileData.url || fileData.path,
          publicId: fileData.publicId || fileData.filename,
          originalName: fileData.originalName || fileData.originalname,
          size: fileData.size,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Image JPG/PNG upload
   */
  async uploadImage(req, res, next) {
    try {
      const fileData = req.uploadedFiles?.[0] || req.file;
      if (!fileData) {
        throw new BadRequestError('No image uploaded');
      }

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: fileData.url || fileData.path,
          publicId: fileData.publicId || fileData.filename,
          originalName: fileData.originalName || fileData.originalname,
          size: fileData.size,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete uploaded file
   */
  async deleteFile(req, res, next) {
    try {
      const { publicId } = req.params;
      if (!publicId) {
        throw new BadRequestError('publicId is required');
      }

      // Check if Cloudinary configuration is used, otherwise try deleting local file
      if (publicId.startsWith('job-recruitment/') || publicId.startsWith('job-reqruitment/')) {
        await cloudinaryConfig.deleteFile(publicId);
      } else {
        // Try deleting local file
        const uploadDirs = ['resumes', 'images', 'logos', 'avatars', 'documents'];
        let deleted = false;

        for (const dir of uploadDirs) {
          const filePath = path.join(__dirname, '..', 'uploads', dir, publicId);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            deleted = true;
            break;
          }
        }
      }

      res.status(200).json({
        success: true,
        message: 'File deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UploadController();
