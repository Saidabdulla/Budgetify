const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController").auth;

const {
    getAccounts,
    getAccountById,
    addAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/accountController");

router.get("/", auth, getAccounts);

router.get("/:id", auth, getAccountById);

router.post("/", auth, addAccount);

router.put("/:id", auth, updateAccount);

router.delete("/:id", auth, deleteAccount);

module.exports = router;
