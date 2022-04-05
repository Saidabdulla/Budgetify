const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findOne({
            email: jwt_payload.email.toLowerCase(),
        });

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    })
);

const auth = passport.authenticate("jwt", { session: false });

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (!user) {
        return res.status(400).json("Invalid credentials!");
    }

    const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!checkPassword) {
        return res.status(400).json("Invalid credentials!");
    }

    const payload = {
        email: user.email,
        password: user.password,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        expiresIn: process.env.JWT_EXPIRES_IN,
        token,
    });
};

module.exports = { login, auth };
