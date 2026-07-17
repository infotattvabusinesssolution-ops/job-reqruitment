const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job reference is required'],
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: [true, 'Candidate reference is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  status: {
    type: String,
    enum: [
      'draft', 'submitted', 'under_review', 'shortlisted',
      'interview_scheduled', 'interviewed', 'offer_sent',
      'offer_accepted', 'offer_declined', 'hired',
      'rejected', 'withdrawn', 'on_hold',
    ],
    default: 'submitted',
  },
  statusHistory: [{
    status: { type: String, required: true },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    changedAt: { type: Date, default: Date.now },
    note: String,
    reason: String,
  }],
  coverLetter: {
    type: String,
    maxlength: 5000,
  },
  resume: {
    url: String,
    publicId: String,
    originalName: String,
  },
  answers: [{
    question: String,
    answer: String,
  }],
  documents: [{
    name: String,
    url: String,
    publicId: String,
    type: String,
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  notes: [{
    text: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addedAt: { type: Date, default: Date.now },
    isPrivate: { type: Boolean, default: true },
  }],
  rejection: {
    reason: String,
    details: String,
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rejectedAt: Date,
  },
  offer: {
    salaryProposed: Number,
    currency: String,
    startDate: Date,
    expiresAt: Date,
    details: String,
    sentAt: Date,
    respondedAt: Date,
    response: {
      type: String,
      enum: ['accepted', 'declined', 'pending'],
    },
  },
  source: {
    type: String,
    enum: ['direct', 'referral', 'recruiter', 'social', 'job_board', 'career_site', 'other'],
    default: 'direct',
  },
  referral: {
    name: String,
    email: String,
    relationship: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  viewedAt: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for interview
applicationSchema.virtual('interviews', {
  ref: 'Interview',
  localField: '_id',
  foreignField: 'application',
});

// Indexes
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ candidate: 1 });
applicationSchema.index({ user: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ matchScore: -1 });
applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ viewedAt: -1 });

// Pre-save to add status history
applicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date(),
      note: `Application status changed to ${this.status}`,
    });
  }
  next();
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;