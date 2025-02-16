import { Router } from "express";
import mongoose from "mongoose";
import { Car } from "../models/cars.js";
import { Insight } from "../models/insight.js";

mongoose.connect(process.env.MONGODB_URI, {});
const carRoute = Router();

carRoute.post("/product", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

carRoute.get("/products/:userId", async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.params.userId });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

carRoute.get("/product/:id", async (req, res) => {
  const userId = req.headers["authorization"];

  try {
    const car = await Car.findOne({ _id: req.params.id, owner: userId });
    const insight = await Insight.findOne(
      { carId: req.params.id },
      "-_id marketInsights popularFeatures recommendations"
    );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const carData = { ...car._doc, insight: insight };

    res.json(carData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

carRoute.put("/product/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

carRoute.delete("/product/:id", async (req, res) => {
  try {
    const result = await Car.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Car not found" });
    }
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

carRoute.get("/search", async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const cars = await Car.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $in: [keyword] } },
      ],
    });

    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default carRoute;
