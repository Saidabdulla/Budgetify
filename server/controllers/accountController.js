const Account = require("../models/account");

exports.getAccounts = async (req, res) => {
    const accounts = await Account.find({ user_id: req.user._id });

    res.status(200).json(accounts);
};

exports.getAccountById = async (req, res) => {
    const account = await Account.findById(req.params.id);

    res.status(200).json(account);
};

exports.addAccount = async (req, res) => {
    const checkAcc = await Account.findOne({
        $and: [
            { name: req.body.name.toLowerCase() },
            {
                currency: req.body.currency.toLowerCase(),
            },
        ],
    });

    if (checkAcc) {
        return res.json("Account exist!");
    }

    const account = {
        name: req.body.name.toLowerCase(),
        currency: req.body.currency.toLowerCase(),
        user_id: req.user._id,
    };

    const saved = await Account.create(account);

    res.status(201).json(saved);
};

exports.updateAccount = async (req, res) => {
    const checkAcc = await Account.findOne({
        $and: [
            { name: req.body.name.toLowerCase() },
            {
                currency: req.body.currency.toLowerCase(),
            },
            {
                _id: { $ne: req.params.id },
            },
        ],
    });

    if (checkAcc) {
        return res.json("Account exist!");
    }

    const account = {
        name: req.body.name.toLowerCase(),
        currency: req.body.currency.toLowerCase(),
        user_id: req.user._id,
    };

    const updated = await Account.findByIdAndUpdate(
        req.params.id,
        {
            $set: account,
        },
        { new: true }
    );

    res.status(200).json(updated);
};

exports.deleteAccount = async (req, res) => {
    await Account.findByIdAndDelete(req.params.id);

    res.status(200).json("Deleted successfully!");
};
