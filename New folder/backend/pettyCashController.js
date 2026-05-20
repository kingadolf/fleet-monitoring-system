const PettyCashInfo = require("./models/pettyCashModel");
const mongoose = require("mongoose");


//get all petty cash info
const getAllPettyCash = async (req, res) => {
    try {
        const pettyCashInfos = await PettyCashInfo.find({});
        res.status(200).json(pettyCashInfos);
        // console.log("Fetched petty cash info:", pettyCashInfos);
    }
    catch (err) {
        console.error("Error fetching petty cash info:", err);
        res.status(500).json({ error: err.message });
    }
};



//get single petty cash info

const getSinglePettyCashInfo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid petty cash info ID" });
    }
    const pettyCashInfo = await PettyCashInfo.findById(id);
    if (!pettyCashInfo) {
        return res.status(404).json({ error: "Petty cash info not found" });
    }
    res.status(200).json(pettyCashInfo);
};

//create petty cash info
const createPettyCashInfo = async (req, res) => {
    const { cashId, description, amount, requestedBy } = req.body;

    //add data on db
    try {
        const pettyCashInfo = await PettyCashInfo.create({
            cashId,
            description,
            amount,
            requestedBy
        });
        res.status(201).json(pettyCashInfo);
    } catch (err) {
        console.error("Error creating petty cash info:", err);
        res.status(500).json({ error: err.message });
    }
};


//delete petty cash info
const deletePettyCashInfo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid petty cash info ID" });
    }

    const pettyCashInfo = await PettyCashInfo.findByIdAndDelete(id);

    if (!pettyCashInfo) {
        return res.status(404).json({ error: "Petty cash info not found" });
    }

    res.status(200).json(pettyCashInfo);
};



//update petty cash info

const updatePettyCashInfo = async (req, res) => {
    const { id } = req.params;
    const { cashId, description, amount, requestedBy } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid petty cash info ID" });
    }

    const pettyCashInfo = await PettyCashInfo.findByIdAndUpdate(id, {
        cashId,
        description,
        amount,
        requestedBy
    }, { new: true });

    if (!pettyCashInfo) {
        return res.status(404).json({ error: "Petty cash info not found" });
    }

    res.status(200).json(pettyCashInfo);
};

module.exports = {
    createPettyCashInfo,
    getAllPettyCash,
    getSinglePettyCashInfo,
    deletePettyCashInfo,
    updatePettyCashInfo
};
