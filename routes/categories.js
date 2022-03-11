const express = require("express");
const router = express.Router();

const categories = [
    {
        name: "Entertainment",
    },
    {
        name: "Car",
    },
    {
        name: "Job",
    },
];

router.get("/", (req, res) => {
    res.status(200).json(categories);
});

router.get("/:id", (req, res) => {
    res.status(200).json(categories[req.params.id]);
});

router.post("/", (req, res) => {
    const category = {
        name: req.body.name,
    };

    categories.push(category);

    res.status(201).json(categories);
});

router.put("/:id", (req, res) => {
    const category = { ...req.body };

    categories[req.params.id] = category;

    res.status(201).json(categories);
});

router.delete("/:id", (req, res) => {
    categories.splice(req.params.id, 1);

    res.status(201).json(categories);
});

module.exports = router;
