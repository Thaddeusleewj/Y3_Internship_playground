import { Request, Response, NextFunction } from "express";
import express from "express";
import bcryptjs from "bcryptjs";

// Importing models
import User from "../models/user.model";

const router = express.Router();

const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
};

export default authController;
