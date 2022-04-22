const Account = require("../models/account");
const Transaction = require("../models/transaction");

exports.main = async (req, res) => {
    try {
        const accounts = await Account.find({ user_id: req.user._id });

        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json(error);
    }
};
