const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    formType: {
      type: String,
      enum: ['contact', 'hiring_support', 'job_seeker', 'career_apply'],
      default: 'contact',
    },
    enquiryType: {
      type: String,
      default: 'General Inquiry',
    },
    serviceRequired: {
      type: String,
      default: '',
    },
    vacancies: {
      type: String,
      default: '',
    },
    jobPosition: {
      type: String,
      default: '',
    },
    jobLocation: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'resolved'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
