const express = require("express");
const router = express.Router();
const { login, setup, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/login", login);
router.post("/setup", setup);
router.get("/me", protect, getMe);

module.exports = router;
