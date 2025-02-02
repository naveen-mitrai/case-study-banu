import mongoose from "mongoose";

const batteryAuditSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    droneID: {
      type: String,
      required: true,
    },
    batteryLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const BatteryAudit = mongoose.model("BatteryAudit", batteryAuditSchema);

export default BatteryAudit;
