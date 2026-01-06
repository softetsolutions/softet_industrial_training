import express from "express";
import { getEnrolledReferralCount} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/dashboard/getEnrolledReferralCount", authMiddleware, getEnrolledReferralCount);

export default router