const express = require("express");
const { register, login, logout, checkAuth } = require("../Controllers/authController");
const { protectedRoute } = require("../MIddlewares/auth.middleware");


const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/check", protectedRoute, checkAuth)

// 


module.exports = router;