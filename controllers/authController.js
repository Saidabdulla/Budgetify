const users = require("../DB/FakeUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const register = (req, res) => {
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

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        const user = users.find((el) => el.email === jwt_payload.email);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
);

const auth = passport.authenticate("jwt", { session: false });

const login = (req, res) => {
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
            token: `Bearer ${token}`,
        });
    } else res.status(400).json("Wrong password or email!");
};

module.exports = { register, login, auth };
