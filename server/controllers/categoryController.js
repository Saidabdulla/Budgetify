const Category = require("../models/category");

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user_id: req.user._id });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.addCategory = async (req, res) => {
    try {
        const checkCat = await Category.findOne({
            $and: [
                { name: req.body.name.toLowerCase() },
                {
                    isIncome: req.body.isIncome,
                },
            ],
        });

        if (checkCat) {
            return res.status(400).json("Category exist!");
        }

        const category = {
            name: req.body.name.toLowerCase(),
            isIncome: req.body.isIncome,
            user_id: req.user._id,
        };

        const saved = await Category.create(category);

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const checkCat = await Category.findOne({
            $and: [
                { name: req.body.name.toLowerCase() },
                {
                    isIncome: req.body.isIncome,
                },
                {
                    _id: { $ne: req.params.id },
                },
            ],
        });

        if (checkCat) {
            return res.status(400).json("Category exist!");
        }

        const category = {
            name: req.body.name.toLowerCase(),
            isIncome: req.body.isIncome,
            user_id: req.user._id,
        };

        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: category,
            },
            { new: true }
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json("Deleted successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
};
