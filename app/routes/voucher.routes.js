// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware")

// CONTROLLER IMPORT
const voucher_controller    = require("../controllers/voucher.controller")

// ROUTES
router.post("/voucher-management", authenticateToken, voucher_controller.create)
router.get("/voucher-management", authenticateToken, voucher_controller.findAll)
router.get("/voucher-management/:id", authenticateToken, voucher_controller.findOne)
router.put("/voucher-management/:id", authenticateToken, voucher_controller.update)
router.delete("/voucher-management", authenticateToken, voucher_controller.deleteAll)
router.delete("/voucher-management/:id", authenticateToken, voucher_controller.deleteOne)

module.exports = router