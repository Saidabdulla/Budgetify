const Category = require("../models/category");

exports.getCategories = async (req, res) => {
    const incomes = await Category.find({
        $and: [{ user_id: req.user._id }, { isIncome: true }],
    });

    const expenses = await Category.find({
        $and: [{ user_id: req.user._id }, { isIncome: false }],
    });

    res.status(200).json({ categories: { incomes, expenses } });
};

exports.getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);

    res.status(200).json(category);
};

exports.addCategory = async (req, res) => {
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
};

exports.updateCategory = async (req, res) => {
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
};

exports.deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json("Deleted successfully!");
};
