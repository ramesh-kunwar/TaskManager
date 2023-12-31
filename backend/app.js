import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { dbConnect } from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dbConnect();

const app = express();

// routes import
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

app.use(express.json());
// Parse JSON requests
app.use(bodyParser.json());
app.use(cookieParser());

// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on PORT ${process.env.PORT}`);
});
