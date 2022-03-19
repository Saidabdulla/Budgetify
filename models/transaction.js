const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = require("./user");
const Account = require("./account");
const Category = require("./category");

const categorySchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        isIncome: {
            type: Boolean,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        note: {
            type: String,
            trim: true,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: Category,
            required: true,
            trim: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
            trim: true,
        },
        account_id: {
            type: Schema.Types.ObjectId,
            ref: Account,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("categories", categorySchema);
