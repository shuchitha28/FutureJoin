const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String },
  role: { type: String, enum: ['intern', 'volunteer'], required: true },
  resumeLink: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Applicant', ApplicantSchema);