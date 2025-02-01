import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  carrier: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
  state: {
    type: String,
    enum: ["LOADING", "DELIVERING", "DELIVERED"],
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
