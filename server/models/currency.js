const mongoose = require("mongoose");
const { Schema } = mongoose;

const currencySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        symbol: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("currencies", currencySchema);
