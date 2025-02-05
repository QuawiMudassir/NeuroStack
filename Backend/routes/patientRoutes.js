const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Patient = require("../models/patient");
const path = require("path");


/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: API for managing patient
 */

// GET all patient
router.get("/", async (req, res) => {
  try {
    console.log("Patient");
    const patient = await Patient.find().populate("doctor_id");
    res.json(patient);
  } catch (err) {
    console.error("Error fetching patient:", err.message);
    res.status(500).json({ error: "Failed to fetch patient" });
  }
});

// POST: Create a new patient
router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      dob,
      gender,
      email,
      contact,
      emergency_contact,
      address,
      doctor_id,
    } = req.body;

    // Check for missing required fields
    if (
      !first_name ||
      !last_name ||
      !dob ||
      !email ||
      !contact ||
      !emergency_contact ||
      !doctor_id
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Check if the email already exists (Unique constraint)
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res
        .status(400)
        .json({ error: "A patient with this email already exists." });
    }

    // Validate phone numbers using regex
    const phoneRegex =
      /^(?:\+1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phoneRegex.test(contact) || !phoneRegex.test(emergency_contact)) {
      return res
        .status(400)
        .json({ error: "Invalid Canadian phone number format." });
    }

    // Validate doctor_id (must be a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(doctor_id)) {
      return res.status(400).json({ error: "Invalid doctor ID." });
    }

    // Create new patient
    const patient = new Patient({
      first_name,
      last_name,
      dob,
      gender: gender || "male",
      email,
      contact,
      emergency_contact,
      address,
      doctor_id,
      created_At: new Date(), // Default to current date
    });

    // Save patient to the database
    await patient.save();

    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (err) {
    console.error("Error creating patient:", err.message);
    res
      .status(500)
      .json({ error: "Failed to create patient", details: err.message });
  }
});

// PUT: Update a patient (no mandatory fields)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    // Find the patient by ID
    const existingPatient = await Patient.findById(id);
    if (!existingPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Update only provided fields
    const updatedData = req.body;

    // If doctor_id is provided, validate it
    if (
      updatedData.doctor_id &&
      !mongoose.Types.ObjectId.isValid(updatedData.doctor_id)
    ) {
      return res.status(400).json({ error: "Invalid doctor ID." });
    }

    // If contact or emergency_contact is provided, validate the phone number format
    const phoneRegex =
      /^(?:\+1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (updatedData.contact && !phoneRegex.test(updatedData.contact)) {
      return res
        .status(400)
        .json({ error: "Invalid Canadian phone number format." });
    }
    if (
      updatedData.emergency_contact &&
      !phoneRegex.test(updatedData.emergency_contact)
    ) {
      return res
        .status(400)
        .json({ error: "Invalid Canadian emergency phone number format." });
    }

    // If email is provided, validate the format
    if (updatedData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updatedData.email)) {
        return res.status(400).json({ error: "Invalid email format." });
      }

      // Check if the email is already used by another patient
      const existingEmailPatient = await Patient.findOne({
        email: updatedData.email,
      });
      if (existingEmailPatient && existingEmailPatient._id.toString() !== id) {
        return res
          .status(400)
          .json({ error: "A patient with this email already exists." });
      }
    }

    // Update the patient record with provided fields
    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Patient updated successfully", updatedPatient });
  } catch (err) {
    console.error("Error updating patient:", err.message);
    res
      .status(500)
      .json({ error: "Failed to update patient", details: err.message });
  }
});

// GET: Fetch a patient by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    // Find the patient and populate the associated doctor details
    const patient = await Patient.findById(id).populate(
      "doctor_id",
      "name description"
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json(patient);
  } catch (err) {
    console.error("Error fetching patient:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch patient", details: err.message });
  }
});

// DELETE: Remove a patient by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    // Find and delete the patient
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res
      .status(200)
      .json({ message: "Patient deleted successfully", deletedPatient });
  } catch (err) {
    console.error("Error deleting patient:", err.message);
    res
      .status(500)
      .json({ error: "Failed to delete patient", details: err.message });
  }
});

module.exports = router;
