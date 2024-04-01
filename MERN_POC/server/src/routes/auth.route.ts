import express from "express";

// Importing controller
import authController from "../controller/auth.controller";

const router = express.Router();

router.post('/signup', authController.signUp)
router.post('/login', authController.login)

export default router;