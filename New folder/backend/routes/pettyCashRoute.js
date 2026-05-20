const express = require("express");

const PettyCash = require("../models/pettyCashModel");


const {
  createPettyCashInfo,
  getAllPettyCash,
  getSinglePettyCashInfo,
  deletePettyCashInfo,
  updatePettyCashInfo
} = require("../pettyCashController");
const router = express.Router();

// GET petty cash all info
router.get("/", getAllPettyCash);

// GET petty cash single info
router.get("/:id", getSinglePettyCashInfo);

// Post petty cash single info
router.post("/", createPettyCashInfo);

// delete petty cash single info
router.delete("/:id", deletePettyCashInfo);

// update petty cash single info
router.patch("/:id", updatePettyCashInfo);


module.exports = router;