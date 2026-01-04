
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { dashboardAccessMiddleware } from "../middleware/dashboardAccessMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, dashboardAccessMiddleware, (req, res) => {
  
  res.json({
    message: "Welcome to your dashboard!",
    user: req.user, 
  });
});

export default router;
