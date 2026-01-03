import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { downloadAppointmentLetterHandler } from "./controllers/userFeatureController.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.get("/api/download-appointment-letter", downloadAppointmentLetterHandler);

export default app;
