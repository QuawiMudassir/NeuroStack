const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true, trim: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  email: { type: String, required: true, unique: true },
  contact: {
    type: Number,
    required: true,
    match: [
      /^(?:\+1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid Canadian phone number format",
    ],
  },
  emergency_contact: {
    type: Number,
    required: true,
    match: [
      /^(?:\+1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid Canadian phone number format",
    ],
  },
  address: { type: String, required: false },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  disorder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disorder",
    required: true,
  },
  created_At: { type: Date, required: true, trim: true },
});

module.exports = mongoose.model("Patient", PatientSchema);
