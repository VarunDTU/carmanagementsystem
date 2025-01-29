import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  car_type: String,
  company: String,
  dealer: String,
  year: Number,
  tags: [String],
  images: [{ type: String, maxCount: 10 }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

export const Car = mongoose.model("cars", carSchema);
