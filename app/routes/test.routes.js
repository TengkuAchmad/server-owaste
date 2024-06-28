// LIBRARY IMPORT
const router = require("express").Router();

// CONTROLLER IMPORT
const test_controller = require("../controllers/test.controller");

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware");

// ROUTES
router.get("/test", test_controller.test);

module.exports = router;