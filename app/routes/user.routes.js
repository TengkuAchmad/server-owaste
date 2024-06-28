// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken }  = require("../middleware/middleware")

// CONTROLLER IMPORT
const user_controller       = require("../controllers/user.controller")

router.get("/user-management/all", user_controller.findAll)


module.exports = router