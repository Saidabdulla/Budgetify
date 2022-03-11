const express = require("express");
const router = express.Router();

const {
    getAccounts,
    getAccountById,
    addAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/accountController");

router.get("/", getAccounts);

router.get("/:id", getAccountById);

router.post("/", addAccount);

router.put("/:id", updateAccount);

router.delete("/:id", deleteAccount);

module.exports = router;
