const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Role name is required'],
    unique: true,
    trim: true,
    lowercase: true,
    enum: ['super_admin', 'admin', 'recruiter', 'employer', 'candidate', 'guest'],
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  permissions: [{
    type: String,
    trim: true,
  }],
  isDefault: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
roleSchema.index({ name: 1 });
roleSchema.index({ isDefault: 1 });

// Static method to get default role
roleSchema.statics.getDefaultRole = async function() {
  return this.findOne({ isDefault: true, isActive: true });
};

// Static method to seed default roles
roleSchema.statics.seedDefaultRoles = async function() {
  const roles = [
    {
      name: 'super_admin',
      displayName: 'Super Admin',
      description: 'Full system access with all permissions',
      priority: 100,
      permissions: [
        'manage_all', 'manage_users', 'manage_roles', 'manage_jobs',
        'manage_applications', 'manage_companies', 'manage_blogs',
        'manage_testimonials', 'manage_faqs', 'manage_settings',
        'view_analytics', 'manage_system', 'audit_logs',
      ],
    },
    {
      name: 'admin',
      displayName: 'Admin',
      description: 'Administrative access with limited system control',
      priority: 90,
      permissions: [
        'manage_users', 'manage_jobs', 'manage_applications',
        'manage_companies', 'manage_blogs', 'manage_testimonials',
        'manage_faqs', 'view_analytics',
      ],
    },
    {
      name: 'employer',
      displayName: 'Employer',
      description: 'Company representative who posts jobs and manages applications',
      priority: 50,
      permissions: [
        'manage_company', 'post_jobs', 'manage_own_jobs',
        'view_applications', 'manage_applications', 'schedule_interviews',
        'view_candidates', 'send_messages',
      ],
    },
    {
      name: 'recruiter',
      displayName: 'Recruiter',
      description: 'Professional recruiter who matches candidates with jobs',
      priority: 40,
      permissions: [
        'view_jobs', 'view_candidates', 'manage_applications',
        'schedule_interviews', 'send_messages', 'view_analytics',
      ],
    },
    {
      name: 'candidate',
      displayName: 'Candidate',
      description: 'Job seeker looking for opportunities',
      priority: 10,
      isDefault: true,
      permissions: [
        'apply_jobs', 'manage_profile', 'save_jobs',
        'view_applications', 'upload_resume',
      ],
    },
    {
      name: 'guest',
      displayName: 'Guest',
      description: 'Unregistered user with limited access',
      priority: 0,
      permissions: [
        'view_jobs', 'view_companies', 'view_blogs',
        'search_jobs', 'contact_support',
      ],
    },
  ];

  for (const role of roles) {
    await this.findOneAndUpdate(
      { name: role.name },
      role,
      { upsert: true, new: true, runValidators: true }
    );
  }
};

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;