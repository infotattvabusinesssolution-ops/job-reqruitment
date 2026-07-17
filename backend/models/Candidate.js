const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  summary: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  skills: [{
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate',
    },
    yearsOfExperience: { type: Number, default: 0 },
  }],
  experience: [{
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: String,
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    description: { type: String, maxlength: 2000 },
    industry: String,
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    },
  }],
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    grade: String,
    activities: String,
    description: String,
  }],
  certifications: [{
    name: { type: String, required: true },
    issuer: String,
    dateObtained: Date,
    expiryDate: Date,
    credentialId: String,
    credentialUrl: String,
  }],
  languages: [{
    name: String,
    proficiency: {
      type: String,
      enum: ['basic', 'conversational', 'professional', 'native'],
    },
  }],
  preferredJobTypes: [{
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance', 'remote'],
  }],
  preferredLocations: [String],
  salaryExpectation: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' },
    period: { type: String, enum: ['hourly', 'monthly', 'yearly'], default: 'yearly' },
  },
  availability: {
    type: String,
    enum: ['immediate', 'two_weeks', 'one_month', 'negotiable'],
    default: 'negotiable',
  },
  resume: {
    url: String,
    publicId: String,
    originalName: String,
    mimeType: String,
    size: Number,
  },
  portfolio: {
    website: String,
    github: String,
    linkedin: String,
    behance: String,
    dribbble: String,
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String,
  },
  preferences: {
    openToRelocation: { type: Boolean, default: false },
    openToRemote: { type: Boolean, default: true },
    willingToTravel: { type: Boolean, default: false },
    travelPercentage: { type: Number, default: 0 },
    noticePeriod: { type: String, default: 'negotiable' },
    workAuthorization: [String],
  },
  views: {
    type: Number,
    default: 0,
  },
  isSearchable: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  completionScore: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for applications
candidateSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'candidate',
});

// Virtual for saved jobs
candidateSchema.virtual('savedJobs', {
  ref: 'SavedJob',
  localField: '_id',
  foreignField: 'candidate',
});

// Indexes
candidateSchema.index({ user: 1 });
candidateSchema.index({ isSearchable: 1 });
candidateSchema.index({ isFeatured: 1 });
candidateSchema.index({ 'skills.name': 1 });
candidateSchema.index({ 'preferredLocations': 1 });
candidateSchema.index({ 'preferredJobTypes': 1 });
candidateSchema.index({ 'experience.current': 1 });
candidateSchema.index({ completionScore: -1 });
candidateSchema.index({ createdAt: -1 });

// Calculate completion score
candidateSchema.methods.calculateCompletionScore = function() {
  let score = 0;
  const fields = [
    { exists: this.title, weight: 10 },
    { exists: this.summary, weight: 10 },
    { exists: this.skills.length > 0, weight: 15 },
    { exists: this.experience.length > 0, weight: 20 },
    { exists: this.education.length > 0, weight: 15 },
    { exists: this.resume.url, weight: 15 },
    { exists: this.languages.length > 0, weight: 5 },
    { exists: this.certifications.length > 0, weight: 5 },
    { exists: this.portfolio.website || this.portfolio.github || this.portfolio.linkedin, weight: 5 },
  ];

  fields.forEach(field => {
    if (field.exists) score += field.weight;
  });

  this.completionScore = score;
  return score;
};

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;