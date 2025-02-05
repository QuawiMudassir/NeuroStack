const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Patient = require("../models/patient");

/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: API for managing patients
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The patient ID
 *         first_name:
 *           type: string
 *           description: The patient's first name
 *         last_name:
 *           type: string
 *           description: The patient's last name
 *         dob:
 *           type: string
 *           format: date
 *           description: The patient's date of birth
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: The patient's gender
 *         email:
 *           type: string
 *           format: email
 *           description: The patient's email address
 *         contact:
 *           type: string
 *           description: The patient's contact phone number (Canadian format)
 *         emergency_contact:
 *           type: string
 *           description: The patient's emergency contact number (Canadian format)
 *         address:
 *           type: string
 *           description: The patient's address
 *         doctor_id:
 *           type: string
 *           description: The ID of the doctor associated with the patient
 *         disorder_id:
 *           type: array
 *           items:
 *             type: string
 *           description: List of disorder IDs associated with the patient
 *         status:
 *           type: string
 *           enum: [active, completed, discontinued]
 *           description: The status of the patient's treatment
 *         created_At:
 *           type: string
 *           format: date
 *           description: The date when the patient record was created
 *     PatientInput:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         email:
 *           type: string
 *           format: email
 *         contact:
 *           type: string
 *         emergency_contact:
 *           type: string
 *         address:
 *           type: string
 *         doctor_id:
 *           type: string
 *         disorder_id:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *           enum: [active, completed, discontinued]
 *       required:
 *         - first_name
 *         - last_name
 *         - dob
 *         - email
 *         - contact
 *         - emergency_contact
 *         - doctor_id
 *         - disorder_id
 *         - status
 */


/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     description: Fetches a list of all patients.
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       500:
 *         description: Internal Server Error
 */
router.get("/", async (req, res) => {
  try {
    const patient = await Patient.find().populate("doctor_id");
    console.log("Patient");

    res.json(patient);
  } catch (err) {
    console.error("Error fetching patient:", err.message);
    res.status(500).json({ error: "Failed to fetch patient" });
  }
});

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     description: Adds a new patient to the database.
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       500:
 *         description: Internal Server Error
 */

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
      status,
      disorder_id,
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
      !doctor_id||
      !status||
      !disorder_id
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
      status,
      disorder_id,
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

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     description: Fetch a patient record by their unique ID
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid patient ID format
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    // Find the patient by ID and populate the associated doctor details
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

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update an existing patient
 *     description: Updates patient details by ID.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The patient ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Bad request (invalid ID or invalid data)
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal Server Error
 */

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
    }

    // Update the patient record
    await Patient.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: "Patient updated successfully." });
  } catch (err) {
    console.error("Error updating patient:", err.message);
    res.status(500).json({ error: "Failed to update patient" });
  }
});

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     description: Removes a patient from the database by their ID.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The patient ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    // Find and delete the patient
    const result = await Patient.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json({ message: "Patient deleted successfully." });
  } catch (err) {
    console.error("Error deleting patient:", err.message);
    res.status(500).json({ error: "Failed to delete patient" });
  }
});

module.exports = router;
