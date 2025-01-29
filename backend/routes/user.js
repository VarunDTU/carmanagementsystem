import bycrpt from "bcrypt";
import { Router } from "express";
import User from "../models/user.js";
const userRoute = Router();

userRoute.get("/count/registered", async (req, res) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  try {
    const recentUsersPerMonth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const result = recentUsersPerMonth.map((item) => ({
      month: monthNames[item._id.month - 1],
      desktop: item.count,
    }));
    console.log(result);

    return res.json(result);
  } catch (error) {
    console.log(error);
    throw new Error("error getting tables from DB");
  }
});

userRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const prevUser = await User.findOne({ email: email }).select("email");
    const hashedPassword = await bycrpt.hash(password, 10);
    if (prevUser) throw new Error("User already exists");
    const res = User.create({
      email: email,
      password: hashedPassword,
    });
    if (!res) return res.json({ error: "Error creating user" });
    return res.json({ message: "User created successfully" });
  } catch (error) {
    return res.json({ error: "Error creating user" });
  }
});

export default userRoute;
