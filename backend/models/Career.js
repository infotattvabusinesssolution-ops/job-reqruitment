const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Career title is required'],
    trim: true,
  },
  dept: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  loc: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  exp: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true,
  },
  salary: {
    type: String,
    required: [true, 'Expected salary is required'],
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

careerSchema.index({ title: 'text', dept: 'text', loc: 'text' });

module.exports = mongoose.model('Career', careerSchema);
