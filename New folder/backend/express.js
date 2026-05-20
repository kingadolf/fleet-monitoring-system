require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const truckInfoRoute = require("./routes/truckInfo");
const pettyCashRoutes = require("./routes/pettyCashRoute");

const app = express();

/* =========================
   CORS CONFIG (IMPORTANT)
========================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://fleet-monitoring-system.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools like Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/truck-info", truckInfoRoute);
app.use("/api/petty-cash", pettyCashRoutes);

/* =========================
   DATABASE
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Error:", err));

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});