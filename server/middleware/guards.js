const User = require("../models/user");

const userGuard = async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email.toLowerCase() });

    if (user && user.role === "user") {
        next();
    } else res.status(403).json("Unauthoried!");
};

module.exports = { userGuard };
