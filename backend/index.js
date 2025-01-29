import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
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
app.get("/api/doc", (req, res) => {
  const __dirname = path.resolve(path.dirname(""));
  return res.sendFile("documentation.html", { root: __dirname });
});
app.get("/api/docs", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/23327393/2sAYQiCo4f");
});

server.listen(port, () => {
  console.log(`server running at ${port}`);
});
