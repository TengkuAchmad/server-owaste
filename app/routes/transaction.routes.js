// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware")

// CONTROLLER IMPORT
const transaction_controller= require("../controllers/transaction.controller")

// ROUTES
router.post("/transaction-management/voucher", authenticateToken, transaction_controller.voucherBuy)

module.exports = router