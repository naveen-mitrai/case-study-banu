import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  weightLimitInGrams: {
    type: Number,
    required: true,
    min: 50,
    max: 1000,
  },
  batteryCapacity: {
    type: Number,
    required: true,
    min: 2000,
    max: 10000,
  },
  batteryLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  state: {
    type: String,
    enum: ["IDLE", "LOADING", "DELIVERING", "DELIVERED", "RETURNING"],
    required: true,
  },
});

const Drone = mongoose.model("Drone", droneSchema);

export default Drone;
