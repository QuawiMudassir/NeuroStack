const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const disorderRoutes = require('./routes/disorderRoutes');
const { swaggerSpec, swaggerUI } = require("./config/swaggerConfig"); // Import Swagger Config

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Swagger UI Route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); 

// API Routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use('/api/disorders', disorderRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

