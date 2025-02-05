const mongoose = require("mongoose");

const TreatmentPlanSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: {
    type: Number,
    required: true,
    match: [
      /^(?:\+1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid Canadian phone number format",
    ],
  },
  specialization : { type: String, required: true },
  subscription:{ type: Boolean, required:true, default: false },
  created_At: { type: Date, required: true, trim: true },

});

module.exports = mongoose.model("TreatmentPlan", TreatmentPlanSchema);
