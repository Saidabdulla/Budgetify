const Transaction = require("../models/transaction");

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $and: [
                {
                    user_id: req.user._id,
                },
                { account_id: req.params.acc_id },
            ],
        }).populate("category_id account_id");

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const transaction = {
            ...req.body,
            user_id: req.user._id,
        };

        const saved = await Transaction.create(transaction);

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = { ...req.body };

        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            {
                $set: transaction,
            },
            { new: true }
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json("Deleted successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
};
