const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Testimonial reviewer name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Testimonial reviewer role is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Testimonial reviewer company is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Testimonial content is required'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Testimonial rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5,
  },
  avatar: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

testimonialSchema.index({ name: 'text', content: 'text' });
testimonialSchema.index({ isActive: 1, isFeatured: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
