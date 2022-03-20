const Transaction = require("../models/transaction");

exports.getTransactions = async (req, res) => {
    const transactions = await Transaction.find({
        $and: [
            {
                user_id: req.user._id,
            },
            { account_id: req.params.acc_id },
        ],
    }).populate("category_id account_id");

    res.status(200).json(transactions);
};

exports.getTransactionById = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    res.status(200).json(transaction);
};

exports.addTransaction = async (req, res) => {
    const transaction = {
        amount: req.body.amount,
        isIncome: req.body.isIncome,
        description: req.body.description,
        note: req.body.note,
        user_id: req.user._id,
        account_id: req.body.account_id,
        category_id: req.body.category_id,
    };

    const saved = await Transaction.create(transaction);

    res.status(201).json(saved);
};

exports.updateTransaction = async (req, res) => {
    const transaction = { ...req.body };

    const updated = await Transaction.findByIdAndUpdate(
        req.params.id,
        {
            $set: transaction,
        },
        { new: true }
    );

    res.status(200).json(updated);
};

exports.deleteTransaction = async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json("Deleted successfully!");
};
