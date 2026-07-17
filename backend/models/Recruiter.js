const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  designation: {
    type: String,
    trim: true,
  },
  assignedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
