const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: [true, 'Service ID is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  icon: {
    type: String,
    required: [true, 'Service icon key is required'],
    default: 'briefcase',
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  shortDesc: {
    type: String,
    required: [true, 'Service short description is required'],
    trim: true,
  },
  longDesc: {
    type: String,
    required: [true, 'Service long description is required'],
    trim: true,
  },
  features: {
    type: [String],
    required: [true, 'Service features are required'],
    default: [],
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

serviceSchema.index({ title: 'text', shortDesc: 'text' });
serviceSchema.index({ serviceId: 1 });
serviceSchema.index({ order: 1 });

module.exports = mongoose.model('Service', serviceSchema);
