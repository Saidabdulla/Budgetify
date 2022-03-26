require("dotenv").config();
require("./core/connectDB")();

const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

const accountRoutes = require("./routes/account");
const transactionRoutes = require("./routes/transaction");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);
app.use("/category", categoryRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server working on ${PORT} - port.`));

module.exports = app;