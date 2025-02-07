const express = require("express");
const router = express.Router();
const Disorder = require("../models/disorder"); // Adjust the path as necessary

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
 *             $ref: '#/components/schemas/Disorder'
 *     responses:
 *       201:
 *         description: Disorder successfully created
 *       400:
 *         description: Invalid input data
 */

/**
* @swagger
* components:
*   schemas:
*     Disorder:
*       type: object
*       properties:
*         disorder_name:
*           type: string
*           example: "Parkinson's Disease"
*         description:
*           type: string
*           example: "A disorder of the central nervous system affecting movement."
*         treatment_plan:
*           type: array
*           items:
*             type: object
*             properties:
*               plan_name:
*                 type: string
*                 example: "Levodopa Therapy"
*               medications:
*                 type: array
*                 items:
*                   type: string
*                 example: ["Levodopa", "Dopamine Agonists"]
*         created_at:
*           type: string
*           format: date-time
*           example: "2024-02-05T12:00:00Z"
*/

router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  try {
    const disorder = await Disorder.findById(req.params.id);
    if (!disorder)
      return res.status(404).json({ message: "Disorder not found" });
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
 *             $ref: '#/components/schemas/Disorder'
 *     responses:
 *       200:
 *         description: Successfully updated disorder
 *       404:
 *         description: Disorder not found
 *       400:
 *         description: Invalid input data
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedDisorder = await Disorder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDisorder)
      return res.status(404).json({ message: "Disorder not found" });
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
router.delete("/:id", async (req, res) => {
  try {
    const deletedDisorder = await Disorder.findByIdAndDelete(req.params.id);
    if (!deletedDisorder)
      return res.status(404).json({ message: "Disorder not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Added New API to fetch the disorder id and it's name for pop-up  form 

/**
 * @swagger
 * /api/disorders/brief:
 *   get:
 *     summary: Retrieve brief information about all disorders (ID and name only)
 *     tags: [Disorders]
 *     responses:
 *       200:
 *         description: A list of disorders with ID and name
 *       500:
 *         description: Server error
 */
router.get("/brief", async (req, res) => {
  try {
    // Retrieve only 'disorder_name' and '_id' fields
    const disorders = await Disorder.find({}, 'disorder_name'); 

    // Map the result to include only the id and disorder_name
    const briefDisorders = disorders.map(disorder => ({
      id: disorder._id,   // _id is MongoDB's default identifier
      disorder_name: disorder.disorder_name
    }));

    res.status(200).json(briefDisorders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
