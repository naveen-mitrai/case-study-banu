import express from 'express';
import Medication from '../models/medication.model.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const medications = await Medication.find({});
        res.status(200).json({success: true, data: medications});
    }
    catch (error) {
        console.log("Error in fetching medications: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

router.post("/", async (req, res) => {
    const medication = req.body;
    
    if (!medication.name || !medication.weightInGrams || !medication.medicationCode) {
        return res.status(400).json({success: false, message: "Please provide all fields."});
    }

    const newMedication = new Medication(medication);
    try {
        await newMedication.save();
        return res.status(201).json({success: true, data: newMedication});
    }
    catch (error) {
        console.log("Error in Create medication: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

export default router;