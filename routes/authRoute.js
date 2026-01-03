import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
//import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/signup", signup);
router.post("/login", login);


// Logout
router.post("/logout", logout);

export default router;
