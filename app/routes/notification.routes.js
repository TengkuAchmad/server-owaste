// UNSUPPORTED FEATURES DUE TO SERVERLESS FUNCTION DEPLOYMENT
// DO NOT USE THIS FILE

// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware")

// CONTROLLER IMPORT
const notification_controller    = require("../controllers/notification.controller")

// ROUTES
router.post("/notification-management", authenticateToken, notification_controller.create)
router.get("/notification-management", authenticateToken, notification_controller.findAll)
router.delete("/notification-management", authenticateToken, notification_controller.deleteAll)

module.exports = router