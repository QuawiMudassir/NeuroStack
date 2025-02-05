const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API for managing doctors
 */

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               contact:
 *                 type: string
 *               specialization:
 *                 type: string
 *               subscription:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Bad request (email exists or validation error)
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      contact,
      specialization,
      subscription,
    } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ error: "A doctor with this email already exists." });
    }

    const doctor = new Doctor({
      first_name,
      last_name,
      email,
      password,
      contact,
      specialization,
      subscription: subscription || false,
      created_At: new Date(),
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create doctor", details: err.message });
  }
});

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctors", details: err.message });
  }
});

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor found
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid doctor ID." });
    }

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    res.status(200).json(doctor);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctor", details: err.message });
  }
});

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *
 *               password:
 *                 type: string
 *               contact:
 *                 type: string
 *               specialization:
 *                 type: string
 *               subscription:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       400:
 *         description: Invalid ID or validation error
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid doctor ID." });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    res
      .status(200)
      .json({ message: "Doctor updated successfully", updatedDoctor });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update doctor", details: err.message });
  }
});

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid doctor ID." });
    }

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    res
      .status(200)
      .json({ message: "Doctor deleted successfully", deletedDoctor });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete doctor", details: err.message });
  }
});

/**
 * @swagger
 * /api/doctors/login:
 *   post:
 *     summary: Login a doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (password !== doctor.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { doctorId: doctor._id, email: doctor.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    return res.json({ token, message: "Login successful", doctor } );
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/doctors/{doctor_id}/patients:
 *   get:
 *     summary: Get all patients by doctor ID
 *     description: Fetch all patients associated with a specific doctor by doctor ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         description: The unique ID of the doctor whose patients are to be fetched
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of patients associated with the specified doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid doctor ID format
 *       404:
 *         description: No patients found for the given doctor
 *       500:
 *         description: Internal server error
 */
router.get("/:doctor_id/patients", async (req, res) => {
  try {
    const { doctor_id } = req.params;

    // Check if the provided doctor_id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(doctor_id)) {
      return res.status(400).json({ error: "Invalid doctor ID." });
    }

    // Find all patients associated with the provided doctor_id
    const patients = await Patient.find({ doctor_id }).populate("doctor_id", "name description");

    if (!patients || patients.length === 0) {
      return res.status(404).json({ error: "No patients found for this doctor." });
    }

    res.status(200).json(patients);
  } catch (err) {
    console.error("Error fetching patients by doctor ID:", err.message);
    res.status(500).json({ error: "Failed to fetch patients", details: err.message });
  }
});

module.exports = router;
