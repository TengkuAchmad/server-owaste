// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware")

// CONTROLLER IMPORT
const waste_controller    = require("../controllers/waste.controller")

// ROUTES
router.post("/waste-management", authenticateToken, waste_controller.create)
router.get("/waste-management", authenticateToken, waste_controller.findAll)
router.get("/waste-management/:id", authenticateToken, waste_controller.findOne)
router.delete("/waste-management", authenticateToken, waste_controller.deleteAll)
router.delete("/waste-management/:id", authenticateToken, waste_controller.deleteOne)

module.exports = router