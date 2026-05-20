const express = require("express");
const TruckInfo = require("../models/truckInfoModel");
const { createTruckInfo, getAllTruckInfo, getSingleTruckInfo, deleteTruckInfo, updateTruckInfo } = require("../truckInfoController");
const router = express.Router();

// GET truck all info
router.get("/", getAllTruckInfo);

// GET truck single info
router.get("/:id", getSingleTruckInfo);

// Post truck single info
router.post("/", createTruckInfo);

// delete truck single info
router.delete("/:id", deleteTruckInfo);

// update truck single info
router.patch("/:id", updateTruckInfo);



module.exports = router;