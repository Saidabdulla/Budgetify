const Currency = require("../models/currency");

exports.getCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find({});

        res.status(200).json(currencies);
    } catch (error) {
        res.status(500).json(error);
    }
};
