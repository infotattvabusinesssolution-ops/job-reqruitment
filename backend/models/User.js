const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-]{10,15}$/, 'Please provide a valid phone number'],
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  profileImage: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    select: false,
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  otp: String,
  otpExpires: Date,
  lastLogin: Date,
  lastActivity: Date,
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: Date,
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: String,
  socialAuth: {
    googleId: String,
    linkedinId: String,
    facebookId: String,
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    jobAlerts: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },
  },
  metadata: {
    registeredIp: String,
    lastLoginIp: String,
    userAgent: String,
    browser: String,
    os: String,
    device: String,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for candidate profile
userSchema.virtual('candidateProfile', {
  ref: 'Candidate',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
});

// Virtual for employer profile
userSchema.virtual('employerProfile', {
  ref: 'Employer',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
});

// Virtual for recruiter profile
userSchema.virtual('recruiterProfile', {
  ref: 'Recruiter',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'socialAuth.googleId': 1 });
userSchema.index({ 'socialAuth.linkedinId': 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  this.loginAttempts += 1;

  if (this.loginAttempts >= 5) {
    this.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
  }

  await this.save();
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockUntil = undefined;
  await this.save();
};

// Generate unique username from email
userSchema.methods.generateUsername = function() {
  return this.email.split('@')[0] + '_' + nanoid(6);
};

// Update last activity
userSchema.methods.updateLastActivity = async function() {
  this.lastActivity = new Date();
  await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;