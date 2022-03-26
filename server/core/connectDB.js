const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/budgetify", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected!");
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
};

module.exports = connectDB;
