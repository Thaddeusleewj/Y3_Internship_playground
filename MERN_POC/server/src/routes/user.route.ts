import express from "express";

// Importing controller
import userController from "../controller/user.controller";

const router = express.Router();

// Defining routes
router.get("/", userController.test);

export default router;
