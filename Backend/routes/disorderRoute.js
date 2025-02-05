const express = require('express');
const router = express.Router();
const Disorder = require('../models/disorder'); // Adjust the path as necessary

/**
 * @swagger
 * tags:
 *   name: Disorders
 *   description: API endpoints for managing neurological disorders
 */

/**
 * @swagger
 * /api/disorders:
 *   post:
 *     summary: Create a new disorder
 *     tags: [Disorders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               disorder_name:
 *                 type: string
 *                 example: "Parkinson's Disease"
 *               description:
 *                 type: string
 *                 example: "A disorder of the central nervous system affecting movement."
 *               common_treatments:
 *                 type: string
 *                 example: "Levodopa, dopamine agonists, physiotherapy"
 *     responses:
 *       201:
 *         description: Disorder successfully created
 *       400:
 *         description: Invalid input data
 */
router.post('/', async (req, res) => {
    try {
        const disorder = new Disorder(req.body);
        const savedDisorder = await disorder.save();
        res.status(201).json(savedDisorder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/disorders:
 *   get:
 *     summary: Retrieve all disorders
 *     tags: [Disorders]
 *     responses:
 *       200:
 *         description: A list of disorders
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const disorders = await Disorder.find();
        res.status(200).json(disorders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/disorders/{id}:
 *   get:
 *     summary: Get a single disorder by ID
 *     tags: [Disorders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disorder ID
 *     responses:
 *       200:
 *         description: Disorder details
 *       404:
 *         description: Disorder not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    try {
        const disorder = await Disorder.findById(req.params.id);
        if (!disorder) return res.status(404).json({ message: 'Disorder not found' });
        res.status(200).json(disorder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/disorders/{id}:
 *   put:
 *     summary: Update a disorder by ID
 *     tags: [Disorders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disorder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               disorder_name:
 *                 type: string
 *                 example: "Alzheimer's Disease"
 *               description:
 *                 type: string
 *                 example: "A progressive disorder affecting memory and cognition."
 *               common_treatments:
 *                 type: string
 *                 example: "Donepezil, memantine, cognitive therapy"
 *     responses:
 *       200:
 *         description: Successfully updated disorder
 *       404:
 *         description: Disorder not found
 *       400:
 *         description: Invalid input data
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedDisorder = await Disorder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDisorder) return res.status(404).json({ message: 'Disorder not found' });
        res.status(200).json(updatedDisorder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/disorders/{id}:
 *   delete:
 *     summary: Delete a disorder by ID
 *     tags: [Disorders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disorder ID
 *     responses:
 *       204:
 *         description: Successfully deleted disorder
 *       404:
 *         description: Disorder not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedDisorder = await Disorder.findByIdAndDelete(req.params.id);
        if (!deletedDisorder) return res.status(404).json({ message: 'Disorder not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;