const express = require("express");
const router = express.Router();

const transactions = [
    {
        category_id: 1,
        isIncome: true,
        amount: 5000000,
        description: "Got salary",
        date: "11/02/2021",
    },
    {
        category_id: 2,
        isIncome: false,
        amount: 250000,
        description: "For car service",
        date: "11/03/2021",
    },
];

router.get("/", (req, res) => {
    res.status(200).json(transactions);
});

router.get("/:id", (req, res) => {
    res.status(200).json(transactions[req.params.id]);
});

router.post("/", (req, res) => {
    const transaction = {
        category_id: req.body.category_id,
        isIncome: req.body.isIncome,
        amount: req.body.amount,
        description: req.body.description,
        date: new Date(),
    };

    transactions.push(transaction);

    res.status(201).json(transactions);
});

router.put("/:id", (req, res) => {
    const transaction = { ...req.body };

    transactions[req.params.id] = transaction;

    res.status(201).json(transactions);
});

router.delete("/:id", (req, res) => {
    transactions.splice(req.params.id, 1);

    res.status(201).json(transactions);
});

module.exports = router;
