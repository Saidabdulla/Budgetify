const express = require("express");
const router = express.Router();

const {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.post("/", addCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
