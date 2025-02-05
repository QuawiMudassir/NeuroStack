const mongoose = require("mongoose");

const DisorderSchema = new mongoose.Schema({
    disorder_name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    treatment_plan: [
      {
        plan_name: { type: String, required: true, unique: true },
        medications: { type: [String], required: true }, // Fixed array of strings
      },
    ],
    created_at: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model("Disorder", DisorderSchema);
