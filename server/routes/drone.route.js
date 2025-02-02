import express from "express";
import { randomInt } from "mathjs";
import Drone from "../models/drone.model.js";

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
  drone.id = generateId(6);
  const newDrone = new Drone(drone);
  try {
    await newDrone.save();
    return res.status(201).json({ success: true, data: newDrone });
  } catch (error) {
    console.log("Error in Create medication: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

function generateId(length) {
  let result = "DRN-";
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

  for (let drone of drones) {
    let newBatteryLevel = Math.max(drone.batteryLevel - 2, 0);
    await Drone.updateOne(
      { id: drone.id },
      { $set: { batteryLevel: newBatteryLevel } }
    );
  }
};

setInterval(drainDroneBattery, 60000);

export default router;
