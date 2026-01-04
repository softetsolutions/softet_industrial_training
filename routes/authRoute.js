import express from "express";
import { signup, login, logout,getMyProfile,getMyReferrals } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/me", authMiddleware, getMyProfile);

router.get("/user/referrals", authMiddleware, getMyReferrals);


// Logout
router.post("/logout", logout);

export default router;
