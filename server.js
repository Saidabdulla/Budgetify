const express = require("express");
const app = express();

const accountRoutes = require("./routes/account");
const transactionRoutes = require("./routes/transaction");
const categoryRoutes = require("./routes/category");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);
app.use("/category", categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server working on ${PORT} - port.`));
