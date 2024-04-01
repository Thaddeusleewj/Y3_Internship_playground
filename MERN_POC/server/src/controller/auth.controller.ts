import { Request, Response, NextFunction } from "express";
import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Importing models
import User from "../models/user.model";
import { errorHandler } from "../utils/error";

const router = express.Router();
const tempJWTHash = "hJg5vT7sPd3R8lN2kF9wQ1zU4xH6zA8s";

const authController = {
  signUp: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, email, password } = req.body;
    // Hashing password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error: Error | any) {
      next(error);
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    try {
      // Checking for a valid user
      const validUser = await User.findOne({ email });

      if (!validUser) {
        return next(errorHandler(401, "Invalid credentials"));
      } else {
        // Checking for a valid password
        const validPassword = bcryptjs.compareSync(
          password,
          validUser.password
        );

        if (!validPassword) {
          return next(errorHandler(401, "Invalid credentials"));
        }
        // const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!);
        const token = jwt.sign({ id: validUser._id }, tempJWTHash);
        const { password: hashedPassword, ...userData } = validUser.toObject();
        const expiryDate = new Date(new Date().getTime() + 3600000); // 1 hour
        res
          .cookie("access_token", token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(userData);
      }
    } catch (error: Error | any) {
      next(error);
    }
  },
};

export default authController;
