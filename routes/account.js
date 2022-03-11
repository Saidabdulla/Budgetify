const express = require("express");
const router = express.Router();

const accounts = [
    { name: "First", currency: "USD", balance: 1000 },
    {
        name: "Second",
        currency: "UZS",
        balance: 120000,
    },
    { name: "Third", currency: "EURO", balance: 600 },
];

router.get("/", (req, res) => {
    res.status(200).json(accounts);
});

router.get("/:id", (req, res) => {
    res.status(200).json(accounts[req.params.id]);
});

router.post("/", (req, res) => {
    const account = {
        name: req.body.name,
        currency: req.body.currency,
        balance: req.body.balance,
    };

    accounts.push(account);

    res.status(201).json(accounts);
});

router.put("/:id", (req, res) => {
    const account = { ...req.body };

    accounts[req.params.id] = account;

    res.status(200).json(accounts);
});

router.delete("/:id", (req, res) => {
    accounts.splice(req.params.id, 1);

    res.status(200).json(accounts);
});

module.exports = router;
