const Account = require("../models/account");
const Transaction = require("../models/transaction");

exports.main = async (req, res) => {
    try {
        const accounts = await Account.find({ user_id: req.user._id });

        const transactions = await Transaction.find({
            $and: [
                { user_id: req.user._id },
                {
                    account_id: req.params.id,
                },
            ],
        }).populate("category_id");

        res.status(200).json({ data: { accounts, transactions } });
    } catch (error) {
        res.status(500).json(error);
    }
};
