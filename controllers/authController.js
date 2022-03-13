const users = require("../DB/FakeUsers");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
    const user = {
        id: Math.round(Math.random() * 1000),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
    };

    users.push(user);

    res.json(users);
};

exports.login = (req, res) => {};
