const TruckInfo = require("./models/truckInfoModel");
const mongoose = require("mongoose");


//get all truck info
const getAllTruckInfo = async (req, res) => {
    try {
        const truckInfos = await TruckInfo.find({});
        res.status(200).json(truckInfos);
        // console.log("Fetched truck info:", truckInfos);
    }
    catch (err) {
        console.error("Error fetching truck info:", err);
        res.status(500).json({ error: err.message });
    }
};



//get single truck info

const getSingleTruckInfo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid truck info ID" });
    }
    const truckinfo = await TruckInfo.findById(id);
    if (!truckinfo) {
        return res.status(404).json({ error: "Truck info not found" });
    }
    res.status(200).json(truckinfo);
};

//create truck info
const createTruckInfo = async (req, res) => {
    const { truckId, name, status, fuelLevel } = req.body;

    //add data on db
    try {
        const truckinfo = await TruckInfo.create({
            truckId,
            name,
            status,
            fuelLevel
        });
        res.status(201).json(truckinfo);
    } catch (err) {
        console.error("Error creating truck info:", err);
        res.status(500).json({ error: err.message });
    }

};


//delete truck info
const deleteTruckInfo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid truck info ID" });
    }

    const truckinfo = await TruckInfo.findByIdAndDelete(id);

    if (!truckinfo) {
        return res.status(404).json({ error: "Truck info not found" });
    }

    res.status(200).json(truckinfo);
};



//update truck info

const updateTruckInfo = async (req, res) => {
    const { id } = req.params;
    const { truckId, name, status, fuelLevel } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid truck info ID" });
    }

    const truckinfo = await TruckInfo.findByIdAndUpdate(id, {
        truckId,
        name,
        status,
        fuelLevel
    }, { new: true });

    if (!truckinfo) {
        return res.status(404).json({ error: "Truck info not found" });
    }

    res.status(200).json(truckinfo);
};

module.exports = {
    createTruckInfo,
    getAllTruckInfo,
    getSingleTruckInfo,
    deleteTruckInfo,
    updateTruckInfo
};
