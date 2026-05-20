const mongoose = require("mongoose");

const truckInfoSchema = new mongoose.Schema({
    truckId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, enum: ["available", "in_transit", "maintenance"], default: "available" },
    fuelLevel: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model("TruckInfo", truckInfoSchema);

