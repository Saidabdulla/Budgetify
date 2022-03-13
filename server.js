require("dotenv").config();

const express = require("express");
const app = express();

const accountRoutes = require("./routes/account");
const transactionRoutes = require("./routes/transaction");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);
app.use("/category", categoryRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server working on ${PORT} - port.`));
