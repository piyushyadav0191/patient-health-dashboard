const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  medicalHistory: [{ type: String }],
  treatmentPlan: { type: String },
});

module.exports = mongoose.model('Patient', PatientSchema);