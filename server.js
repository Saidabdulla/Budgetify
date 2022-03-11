const express = require("express");
const app = express();

const accountRoutes = require("./routes/account");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", accountRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server working on ${PORT} - port.`));
