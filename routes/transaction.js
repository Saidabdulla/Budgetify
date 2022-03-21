const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController").auth;
const { userGuard } = require("../middleware/guards");

const {
    getTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/transactionController");

router.get("/account/:acc_id", auth, userGuard, getTransactions);

router.get("/id/:id", auth, userGuard, getTransactionById);

router.post("/", auth, userGuard, addTransaction);

router.put("/:id", auth, userGuard, updateTransaction);

router.delete("/:id", auth, userGuard, deleteTransaction);

module.exports = router;
