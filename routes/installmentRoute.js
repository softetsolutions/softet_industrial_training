import express from "express";
import { payFirstInstallment,paySecondInstallment } from "../controllers/paymentController.js";
import { authMiddleware, } from "../middleware/authMiddleware.js";
//import { dashboardAccessMiddleware } from "../middleware/dashboardAccessMiddleware.js";

const router = express.Router();
router.post("/dashboard/firstInstallment", authMiddleware, payFirstInstallment);

router.post("/dashboard/secondInstallment", authMiddleware, paySecondInstallment);

// Dashboard route

export default router