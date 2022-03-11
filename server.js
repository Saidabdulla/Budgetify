const express = require("express");
const app = express();

const accountRoutes = require("./routes/account");
const transactionRoutes = require("./routes/transaction");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server working on ${PORT} - port.`));
