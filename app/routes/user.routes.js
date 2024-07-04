// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware")

// CONTROLLER IMPORT
const user_controller       = require("../controllers/user.controller")

router.post("/user-management/auth", user_controller.auth)
router.post("/user-management/create", user_controller.create)
router.put("/user-management/update", authenticateToken, user_controller.update)
router.get("/user-management/find/all", authenticateToken,user_controller.findAll)
router.get("/user-management/find/one", authenticateToken, user_controller.findOne)
router.delete("/user-management/delete/one", authenticateToken, user_controller.deleteOne)
router.delete("/user-management/delete/all", authenticateToken, user_controller.deleteAll)

module.exports = router