const accounts = [
    { name: "First", currency: "USD", balance: 1000 },
    {
        name: "Second",
        currency: "UZS",
        balance: 120000,
    },
    { name: "Third", currency: "EURO", balance: 600 },
];

exports.getAccounts = (req, res) => {
    res.status(200).json(accounts);
};

exports.getAccountById = (req, res) => {
    res.status(200).json(accounts[req.params.id]);
};

exports.addAccount = (req, res) => {
    const account = {
        name: req.body.name,
        currency: req.body.currency,
        balance: req.body.balance,
    };

    accounts.push(account);

    res.status(201).json(accounts);
};

exports.updateAccount = (req, res) => {
    const account = { ...req.body };

    accounts[req.params.id] = account;

    res.status(200).json(accounts);
};

exports.deleteAccount = (req, res) => {
    accounts.splice(req.params.id, 1);

    res.status(200).json(accounts);
};
