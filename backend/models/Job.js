const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required'],
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Employer is required'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  employmentType: {
    type: String,
    required: [true, 'Employment type is required'],
    enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship', 'freelance'],
  },
  workMode: {
    type: String,
    required: [true, 'Work mode is required'],
    enum: ['on-site', 'remote', 'hybrid'],
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
  },
  experienceMin: {
    type: Number,
    default: 0,
  },
  experienceMax: {
    type: Number,
    default: 0,
  },
  education: {
    type: String,
    enum: ['high-school', 'diploma', 'associate', 'bachelor', 'master', 'doctorate', 'any'],
    default: 'any',
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [10000, 'Description cannot exceed 10000 characters'],
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters'],
  },
  responsibilities: [{
    type: String,
    maxlength: 1000,
  }],
  requirements: [{
    type: String,
    required: [true, 'At least one requirement is required'],
    maxlength: 1000,
  }],
  preferredQualifications: [{
    type: String,
    maxlength: 1000,
  }],
  skills: [{
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ['nice-to-have', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate',
    },
    isRequired: { type: Boolean, default: true },
  }],
  locations: [{
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  }],
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'USD' },
    period: { type: String, enum: ['hourly', 'monthly', 'yearly'], default: 'yearly' },
    isNegotiable: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
  },
  benefits: [{
    name: String,
    description: String,
    category: {
      type: String,
      enum: ['health', 'financial', 'work-life', 'growth', 'other'],
    },
  }],
  applicationDeadline: {
    type: Date,
  },
  numberOfOpenings: {
    type: Number,
    default: 1,
    min: 1,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed', 'filled', 'expired', 'archived'],
    default: 'draft',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  isConfidential: {
    type: Boolean,
    default: false,
  },
  applicationMethod: {
    type: String,
    enum: ['internal', 'external'],
    default: 'internal',
  },
  externalApplyUrl: String,
  publishedAt: Date,
  closedAt: Date,
  views: {
    type: Number,
    default: 0,
  },
  applicationCount: {
    type: Number,
    default: 0,
  },
  savedCount: {
    type: Number,
    default: 0,
  },
  shareCount: {
    type: Number,
    default: 0,
  },
  tags: [String],
  metadata: {
    promotedUntil: Date,
    source: String,
    referenceId: String,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for applications
jobSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'job',
});

// Indexes
jobSchema.index({ title: 'text', description: 'text', 'skills.name': 'text' });
jobSchema.index({ slug: 1 });
jobSchema.index({ company: 1 });
jobSchema.index({ employer: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ employmentType: 1 });
jobSchema.index({ workMode: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ isFeatured: 1 });
jobSchema.index({ isUrgent: 1 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });
jobSchema.index({ publishedAt: -1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ 'locations.city': 1 });
jobSchema.index({ 'locations.country': 1 });
jobSchema.index({ applicationDeadline: 1 });

// Pre-save to create slug and set publishedAt
jobSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
  }

  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  if (this.isModified('status') && (this.status === 'closed' || this.status === 'filled')) {
    this.closedAt = new Date();
  }

  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;