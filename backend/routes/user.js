import bycrpt from "bcrypt";
import { Router } from "express";
import User from "../models/user.js";
const userRoute = Router();



userRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const prevUser = await User.findOne({ email: email }).select("email");
    const hashedPassword = await bycrpt.hash(password, 10);
    if (prevUser) throw new Error("User already exists");
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    console.log(newUser);
    if (!newUser) return res.json({ error: "Error creating user" });
    return res.json({ message: "User created successfully" });
  } catch (error) {
    return res.json(error.message);
  }
});

export default userRoute;
