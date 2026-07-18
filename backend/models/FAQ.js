const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'FAQ question is required'],
    trim: true,
    maxlength: [500, 'Question cannot exceed 500 characters'],
  },
  answer: {
    type: String,
    required: [true, 'FAQ answer is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'FAQ category is required'],
    enum: ['General', 'For Job Seekers', 'For Employers', 'Account & Support'],
    default: 'General',
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

faqSchema.index({ question: 'text', answer: 'text' });
faqSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('FAQ', faqSchema);
