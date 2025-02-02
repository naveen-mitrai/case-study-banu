import express from "express";
import BatteryAudit from "../models/batteryAudit.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const batteryAudits = await BatteryAudit.find({});
    res.status(200).json({ success: true, data: batteryAudits });
  } catch (error) {
    console.log("Error in fetching drone battery audits: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
