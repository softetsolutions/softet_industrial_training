import express from "express";
import {
  getEnrolledReferralCount,
  getSecondInstallmentPriceToPayByEmail,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get(
  "/dashboard/getEnrolledReferralCount",
  authMiddleware,
  getEnrolledReferralCount,
);

router.post(
  "/dashboard/getSecondInstallmentPriceToPayByEmail",
  authMiddleware,
  adminMiddleware,
  getSecondInstallmentPriceToPayByEmail,
);

export default router;
