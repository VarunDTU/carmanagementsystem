import "dotenv/config";
import express from "express";
import { createServer } from "http";

import cors from "cors";
import carRoute from "./routes/cars.js";
import userRoute from "./routes/user.js";
const app = express();
const port = 8000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
const server = createServer(app);

app.get("/", (req, res) => {
  return res.json({ status: "active" });
});
app.use("/user", userRoute);
app.use("/car", carRoute);
server.listen(port, () => {
  console.log(`server running at ${port}`);
});
