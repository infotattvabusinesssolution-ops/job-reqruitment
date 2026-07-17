const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipient is required'],
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: [
      'application_received', 'application_status', 'interview_scheduled',
      'interview_reminder', 'job_match', 'job_recommendation',
      'profile_view', 'message', 'offer', 'system', 'alert',
      'invitation', 'reminder', 'announcement',
    ],
    required: [true, 'Notification type is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: 200,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 1000,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  link: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  readAt: Date,
  seenAt: Date,
  expiresAt: Date,
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Notification', notificationSchema);