const mongoose = require("mongoose");

const pettyCashSchema = new mongoose.Schema({
    cashId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    requestedBy: {  type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("PettyCash", pettyCashSchema);

