import express from "express";
import { randomInt } from "mathjs";
import Order from "../models/order.model.js";
import Drone from "../models/drone.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log("Error in fetching medications: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const order = req.body;

  if (!order.carrier || !order.items) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields." });
  }

  order.state = "LOADING";
  order.id = generateId(6);
  const newOrder = new Order(order);
  try {
    await newOrder.save();

    // Update drone state
    await Drone.updateOne(
      { id: order.carrier }, // Condition
      { $set: { state: "LOADING" } } // Update operation
    );

    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.log("Error in Create medication: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

function generateId(length) {
  let result = "ORD-";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(randomInt(0, charactersLength));
    counter += 1;
  }
  return result;
}

export default router;
