const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = require("./user");

const accountSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        currency: {
            type: String,
            required: true,
            trim: true,
        },
        balance: {
            type: Number,
            required: true,
            min: 0,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("account", accountSchema);
