const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0", // OpenAPI version
  info: {
    title: "Doctor & Patient API",
    version: "1.0.0",
    description: "API documentation for managing doctors and patients",
  },
  servers: [
    {
      url: "http://localhost:3000", // Ensure this matches the app's port
      description: "Local server",
    },
  ],
};

// Options for swagger docs
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Make sure this points to your route files
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUI };
