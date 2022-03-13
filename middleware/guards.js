const users = require("../DB/FakeUsers");

const userGuard = (req, res, next) => {
    const user = users.find((el) => el.email === req.user.email);

    if (user && user.role === "user") {
        next();
    } else res.status(403).json("Unauthoried!");
};

module.exports = { userGuard };
