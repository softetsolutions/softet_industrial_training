import express from "express";
import { payFirstInstallment,paySecondInstallment } from "../controllers/paymentController.js";
import { authMiddleware, } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
//import { dashboardAccessMiddleware } from "../middleware/dashboardAccessMiddleware.js";

const router = express.Router();
router.post("/dashboard/firstInstallment",authMiddleware,adminMiddleware, payFirstInstallment);// authMiddleware,

router.post("/dashboard/secondInstallment",authMiddleware,adminMiddleware,  paySecondInstallment);//authMiddleware,

// Dashboard route

export default router