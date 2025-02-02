import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import medicationRoutes from "./routes/medication.route.js";
import droneRoutes from "./routes/drone.route.js";
import orderRoutes from "./routes/order.route.js";
import auditRoutes from "./routes/batteryAudit.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/medications", medicationRoutes);
app.use("/api/drones", droneRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/logs", auditRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
