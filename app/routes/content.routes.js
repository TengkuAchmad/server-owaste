// LIBRARY IMPORT
const router                = require("express").Router()

// MIDDLEWARE IMPORT
const { authenticateToken } = require("../middleware/middleware")

// CONTROLLER IMPORT
const article_controller    = require("../controllers/article.controller")

// ROUTES
router.post("/article-management", authenticateToken, article_controller.create)
router.get("/article-management", authenticateToken, article_controller.findAll)
router.get("/article-management/:id", authenticateToken, article_controller.findOne)
router.delete("/article-management", authenticateToken, article_controller.deleteAll)
router.delete("/article-management/:id", authenticateToken, article_controller.deleteOne)

module.exports = router