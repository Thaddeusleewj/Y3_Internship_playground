import express from "express";

// Importing controller
import authController from "../controller/auth.controller";

const router = express.Router();

router.post('/signup', authController.signUp)

export default router;