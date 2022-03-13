const users = require("../DB/FakeUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    res.status(200).json(users);
};

exports.login = (req, res) => {
    const user = users.find((el) => el.email === req.body.email);

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
            email: user.email,
            password: user.password,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            token,
        });
    } else res.status(401).json("Wrong password or email!");
};
