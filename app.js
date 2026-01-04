import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import installmentRoute from "./routes/installmentRoute.js";
import { downloadAppointmentLetterHandler } from "./controllers/userFeatureController.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // exact frontend URL
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/installment", installmentRoute);


app.get("/api/download-appointment-letter/:id", downloadAppointmentLetterHandler);

export default app;
