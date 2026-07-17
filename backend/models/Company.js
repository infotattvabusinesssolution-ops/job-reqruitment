const mongoose = require('mongoose');
const slugify = require('slugify');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    maxlength: 5000,
  },
  shortDescription: {
    type: String,
    maxlength: 300,
  },
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
  },
  foundedYear: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear(),
  },
  website: String,
  phone: String,
  email: String,
  logo: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  coverImage: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  locations: [{
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    isHeadquarter: { type: Boolean, default: false },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  }],
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String,
    youtube: String,
  },
  benefits: [{
    title: String,
    description: String,
    icon: String,
  }],
  culture: {
    mission: String,
    vision: String,
    values: [String],
    description: String,
  },
  gallery: [{
    url: String,
    publicId: String,
    caption: String,
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  jobCount: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for jobs
companySchema.virtual('jobs', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'company',
});

// Virtual for reviews
companySchema.virtual('reviews', {
  ref: 'CompanyReview',
  localField: '_id',
  foreignField: 'company',
});

// Indexes
companySchema.index({ name: 1 });
companySchema.index({ slug: 1 });
companySchema.index({ industry: 1 });
companySchema.index({ isVerified: 1 });
companySchema.index({ isFeatured: 1 });
companySchema.index({ isActive: 1 });
companySchema.index({ rating: -1 });
companySchema.index({ 'locations.city': 1 });
companySchema.index({ 'locations.country': 1 });
companySchema.index({ createdAt: -1 });

// Pre-save to create slug
companySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Text index for search
companySchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  'locations.city': 'text',
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;