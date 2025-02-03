import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weightInGrams: {
    type: Number,
    required: true,
    min: 0,
  },
  medicationCode: {
    type: String,
    required: true,
    unique: true,
  },
});

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
