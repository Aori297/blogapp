import express from "express";
import http from "node:http";
import "dotenv/config";
import "express-async-errors";
import mongoose from "mongoose";
import appRoutes from "./routes/index.js";
import { CustomError } from "./helpers/error-handler.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v1", appRoutes);

app.all("*", (req, res) => {
  return res.status(404).json({
    statusCode: 404,
    message: `${req.originalUrl} not found`,
  });
});

// custom error handling
app.use((error, _req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.serializeErrors());
  }
  next();
});

const server = http.createServer(app);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.log(error.message));

server.listen(process.env.PORT, () => {
  console.log("Server is running in port 4000");
});
