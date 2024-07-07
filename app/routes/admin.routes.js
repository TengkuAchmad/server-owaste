// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware")

// CONTROLLER IMPORT
const admin_controller       = require("../controllers/admin.controller")

router.post("/admin-management/auth", admin_controller.auth)
router.post("/admin-management/create", admin_controller.create)
router.put("/admin-management/update/:id", authenticateToken, admin_controller.update)
router.get("/admin-management/find/all", authenticateToken,admin_controller.findAll)
router.get("/admin-management/find/one", authenticateToken, admin_controller.findOne)
router.delete("/admin-management/delete/:id", authenticateToken, admin_controller.deleteOne)
router.delete("/admin-management/delete", authenticateToken, admin_controller.deleteAll)

module.exports = router