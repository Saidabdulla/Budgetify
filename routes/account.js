const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController").auth;
const { userGuard } = require("../middleware/guards");

const {
    getAccounts,
    getAccountById,
    addAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/accountController");

router.get("/", auth, userGuard, getAccounts);

router.get("/:id", auth, userGuard, getAccountById);

router.post("/", auth, userGuard, addAccount);

router.put("/:id", auth, userGuard, updateAccount);

router.delete("/:id", auth, userGuard, deleteAccount);

module.exports = router;
