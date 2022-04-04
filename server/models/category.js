const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = require("./user");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        isIncome: {
            type: Boolean,
            required: true,
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

module.exports = mongoose.model("categories", categorySchema);
