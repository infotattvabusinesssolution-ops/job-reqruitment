const Service = require('../models/Service');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const logger = require('../utils/logger');

class ServiceController {
  /**
   * Retrieve list of services
   */
  async getAllServices(req, res, next) {
    try {
      const { search, all } = req.query;
      const query = {};

      const isAdmin = req.user && ['admin', 'super_admin'].includes(req.user.role?.name);
      if (!all || !isAdmin) {
        query.isActive = true;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { shortDesc: { $regex: search, $options: 'i' } },
          { longDesc: { $regex: search, $options: 'i' } },
        ];
      }

      const services = await Service.find(query).sort({ order: 1, createdAt: 1 });

      res.status(200).json({
        success: true,
        data: services,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve single service by ID
   */
  async getServiceById(req, res, next) {
    try {
      const { id } = req.params;
      const service = await Service.findById(id);

      if (!service) {
        throw new NotFoundError('Service not found');
      }

      res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new service (Admin/Super Admin only)
   */
  async createService(req, res, next) {
    try {
      const { serviceId, icon, title, shortDesc, longDesc, features, order, isActive } = req.body;

      if (!serviceId || !title || !shortDesc || !longDesc) {
        throw new BadRequestError('Service ID, Title, shortDesc, and longDesc are required');
      }

      const existingService = await Service.findOne({ serviceId: serviceId.toLowerCase() });
      if (existingService) {
        throw new BadRequestError('Service with this ID already exists');
      }

      const service = await Service.create({
        serviceId: serviceId.toLowerCase(),
        icon: icon || 'briefcase',
        title,
        shortDesc,
        longDesc,
        features: features || [],
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      });

      logger.info(`Service created: ${service._id}`);

      res.status(201).json({
        success: true,
        message: 'Service created successfully',
        data: service,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing service (Admin/Super Admin only)
   */
  async updateService(req, res, next) {
    try {
      const { id } = req.params;
      const service = await Service.findById(id);

      if (!service) {
        throw new NotFoundError('Service not found');
      }

      const fieldsToUpdate = ['serviceId', 'icon', 'title', 'shortDesc', 'longDesc', 'features', 'order', 'isActive'];
      for (const field of fieldsToUpdate) {
        if (req.body[field] !== undefined) {
          if (field === 'serviceId') {
            const sid = req.body[field].toLowerCase();
            const dupe = await Service.findOne({ serviceId: sid, _id: { $ne: id } });
            if (dupe) {
              throw new BadRequestError('Service with this ID already exists');
            }
            service.serviceId = sid;
          } else {
            service[field] = req.body[field];
          }
        }
      }

      await service.save();
      logger.info(`Service updated: ${service._id}`);

      res.status(200).json({
        success: true,
        message: 'Service updated successfully',
        data: service,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete service (Admin/Super Admin only)
   */
  async deleteService(req, res, next) {
    try {
      const { id } = req.params;
      const service = await Service.findById(id);

      if (!service) {
        throw new NotFoundError('Service not found');
      }

      await service.deleteOne();
      logger.info(`Service deleted: ${id}`);

      res.status(200).json({
        success: true,
        message: 'Service deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ServiceController();
