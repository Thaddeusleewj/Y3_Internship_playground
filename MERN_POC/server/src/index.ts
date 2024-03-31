import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Importing config files
import MongoConfig from "../config";
// Importing routes
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

// Call MongoConfig to establish the MongoDB connection
MongoConfig();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Middleware for error handling
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
      success: false,
      error: message,
      statusCode: statusCode,
    });
  }
);
