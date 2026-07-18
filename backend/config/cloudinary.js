const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const logger = require('../utils/logger');

class CloudinaryConfig {
  constructor() {
    this.initialize();
  }

  initialize() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  getStorage(folder, allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'pdf']) {
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: `job-reqruitment/${folder}`,
        allowed_formats: allowedFormats,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        resource_type: 'auto',
      },
    });
  }

  async uploadFile(filePath, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: options.folder || 'job-reqruitment/general',
        use_filename: true,
        unique_filename: true,
        resource_type: 'auto',
        ...options,
      });
      return result;
    } catch (error) {
      logger.error('Cloudinary upload failed detail:', error?.message || error);
      throw error;
    }
  }

  async deleteFile(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      logger.error('Cloudinary delete failed:', error);
      throw new Error('File deletion failed');
    }
  }

  async getFileInfo(publicId) {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result;
    } catch (error) {
      logger.error('Cloudinary get file info failed:', error);
      return null;
    }
  }

  getOptimizedUrl(publicId, options = {}) {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
      ...options,
    });
  }

  getTransformedUrl(publicId, transformations) {
    return cloudinary.url(publicId, {
      transformation: transformations,
    });
  }

  // Generate a signature for client-side uploads
  generateSignature(params) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, ...params },
      process.env.CLOUDINARY_API_SECRET
    );
    return { timestamp, signature };
  }
}

module.exports = new CloudinaryConfig();