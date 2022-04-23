const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController").auth;
const { userGuard } = require("../middleware/guards");

const { getCurrencies } = require("../controllers/currencyController");

router.get("/", auth, userGuard, getCurrencies);

module.exports = router;
