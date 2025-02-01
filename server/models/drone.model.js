import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    weightLimitInGrams: {
        type: Number,
        required: true,
        min: 50,
        max: 1000
    },
    batteryCapacity: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        enum: ['IDLE', 'LOADING', 'DELIVERING', 'DELIVERED', 'RETURNING'],
        required: true
    }
})

const Drone = mongoose.model('Drone', droneSchema);

export default Drone;