const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerDocument = require("../dtpc.postman_collection.json-OpenApi3Json");

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
