import express from "express";
import { randomInt } from "mathjs";
import Drone from "../models/drone.model.js";
import BatteryAudit from "../models/batteryAudit.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { model, weightLimitInGrams, state } = req.query;
    let filter = {};

    if (model) filter.model = model;
    if (weightLimitInGrams) filter.weightLimitInGrams = weightLimitInGrams;
    if (state) filter.state = state;

    const drones = await Drone.find(filter);
    res.status(200).json({ success: true, data: drones });
  } catch (error) {
    console.log("Error in fetching medications: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const drone = req.body;

  if (!drone.model || !drone.weightLimitInGrams || !drone.batteryCapacity) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields." });
  }

  drone.state = "IDLE";
  drone.id = generateId("DRN-", 6);
  const newDrone = new Drone(drone);
  try {
    await newDrone.save();
    return res.status(201).json({ success: true, data: newDrone });
  } catch (error) {
    console.log("Error in Create medication: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

function generateId(prefix, length) {
  let result = prefix;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(randomInt(0, charactersLength));
    counter += 1;
  }
  return result;
}

const drainDroneBattery = async () => {
  const drones = await Drone.find({
    state: { $in: ["DELIVERING", "RETURNING"] },
  });
  let promises = [];

  for (let drone of drones) {
    let newBatteryLevel = Math.max(drone.batteryLevel - 2, 0);
    promises.push(
      Drone.updateOne(
        { id: drone.id },
        { $set: { batteryLevel: newBatteryLevel } }
      )
    );
    const batteryAudit = {
      id: generateId("AUD-", 6),
      droneID: drone.id,
      batteryLevel: newBatteryLevel,
    };
    const newAudit = new BatteryAudit(batteryAudit);
    promises.push(newAudit.save());
  }
  try {
    await Promise.all(promises);
  } catch (error) {
    console.log("Error in audit battery level: ", error.message);
  }
};

router.patch("/:id", async (req, res) => {
  const droneID = req.params.id;
  const drone = req.body;
  try {
    // Update drone state
    await Drone.updateOne({ id: droneID }, { $set: { state: drone.state } });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in Update drone: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

setInterval(drainDroneBattery, 60000);

export default router;
