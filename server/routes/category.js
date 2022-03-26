const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController").auth;
const { userGuard } = require("../middleware/guards");

const {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

router.get("/", auth, userGuard, getCategories);

router.get("/:id", auth, userGuard, getCategoryById);

router.post("/", auth, userGuard, addCategory);

router.put("/:id", auth, userGuard, updateCategory);

router.delete("/:id", auth, userGuard, deleteCategory);

module.exports = router;
