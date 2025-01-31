import express from 'express';
import Drone from '../models/drone.model.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { model, weightLimitInGrams, state } = req.query;
        let filter = {};

        if (model) filter.model = model;
        if (weightLimitInGrams) filter.weightLimitInGrams = weightLimitInGrams;
        if (state) filter.state = state;

        const drones = await Drone.find(filter);
        res.status(200).json({success: true, data: drones});
    }
    catch (error) {
        console.log("Error in fetching medications: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

router.post("/", async (req, res) => {
    const drone = req.body;
    
    if (!drone.model || !drone.weightLimitInGrams || !drone.batteryCapacity || !drone.state) {
        return res.status(400).json({success: false, message: "Please provide all fields."});
    }

    const newDrone = new Drone(drone);
    try {
        await newDrone.save();
        return res.status(201).json({success: true, data: newDrone});
    }
    catch (error) {
        console.log("Error in Create medication: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

export default router;