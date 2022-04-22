const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController").auth;
const { userGuard } = require("../middleware/guards");

const { main } = require("../controllers/mainController");

router.get("/", auth, userGuard, main);

module.exports = router;
