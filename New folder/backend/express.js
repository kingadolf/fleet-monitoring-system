require("dotenv").config();
const truckInfoRoute = require("./routes/truckInfo");
const pettyCashRoutes = require("./routes/pettyCashRoute");


const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json()); // for parsing application/json    
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
});


// ROUTES FIRST //get request
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });

});

//routes
app.use("/api/truck-info", truckInfoRoute);


app.use("/api/petty-cash", pettyCashRoutes);


app.get("/api/activity", async (req, res) => {
  const activity = await Activity.find().sort({ createdAt: -1 }).limit(3);
  res.json(activity);
});

//start db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB", mongoose.connection.db.databaseName))
    .catch((err) => console.error("Error connecting to MongoDB:", err));



// START SERVER LAST
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});