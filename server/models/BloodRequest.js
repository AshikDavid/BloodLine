const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    units: {
      type: Number,
      required: true,
      min: 1
    },
    hospital: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    urgency: {
      type: String,
      enum: ['normal', 'urgent', 'critical'],
      default: 'normal'
    },
    status: {
      type: String,
      enum: ['open', 'approved', 'completed', 'rejected'],
      default: 'open'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
