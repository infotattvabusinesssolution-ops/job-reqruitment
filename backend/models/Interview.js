const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: [true, 'Application reference is required'],
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['phone', 'video', 'in-person', 'technical', 'hr', 'panel', 'group'],
    required: [true, 'Interview type is required'],
  },
  mode: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online',
  },
  title: {
    type: String,
    required: [true, 'Interview title is required'],
  },
  description: String,
  schedule: {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number, default: 60 }, // minutes
    timezone: { type: String, default: 'UTC' },
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    meetingLink: String,
    meetingId: String,
    meetingPassword: String,
  },
  interviewers: [{
    name: { type: String, required: true },
    email: String,
    role: String,
    isMainInterviewer: { type: Boolean, default: false },
  }],
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled',
  },
  result: {
    type: String,
    enum: ['pending', 'passed', 'failed', 'on_hold'],
    default: 'pending',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  feedback: {
    strengths: [String],
    weaknesses: [String],
    notes: String,
    recommendation: {
      type: String,
      enum: ['strong_hire', 'hire', 'maybe', 'no'],
    },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submittedAt: Date,
  },
  reminders: [{
    type: { type: String, enum: ['email', 'sms', 'push'] },
    sentAt: Date,
    status: { type: String, enum: ['sent', 'failed', 'pending'] },
  }],
  attachments: [{
    name: String,
    url: String,
    type: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

interviewSchema.index({ application: 1 });
interviewSchema.index({ job: 1 });
interviewSchema.index({ candidate: 1 });
interviewSchema.index({ employer: 1 });
interviewSchema.index({ 'schedule.date': 1 });
interviewSchema.index({ status: 1 });

module.exports = mongoose.model('Interview', interviewSchema);