const Account = require("../models/account");

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ user_id: req.user._id }).populate(
            "currency_id"
        );

        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id).populate(
            "currency_id"
        );

        res.status(200).json(account);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.addAccount = async (req, res) => {
    try {
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
            user_id: req.user._id,
            ...req.body,
        };

        const saved = await Account.create(account);

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateAccount = async (req, res) => {
    try {
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
            user_id: req.user._id,
            ...req.body,
        };

        const updated = await Account.findByIdAndUpdate(
            req.params.id,
            {
                $set: account,
            },
            { new: true }
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.params.id);

        res.status(200).json("Deleted successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
};
