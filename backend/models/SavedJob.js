const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
}, {
  timestamps: true,
});

// Avoid duplicate saves
savedJobSchema.index({ candidate: 1, job: 1 }, { unique: true });
savedJobSchema.index({ user: 1 });
savedJobSchema.index({ job: 1 });

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;
