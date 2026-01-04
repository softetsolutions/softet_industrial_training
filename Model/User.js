import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 15,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
     referralCode: {
      type: String,
      unique: true,
    },

    referredBy: {
      type: String, 
      default: null,
    },
     firstInstallment: {
      paid: { type: Boolean, default: false },
      paidAt: { type: Date, default: null },
      accessEnd: { type: Date, default: null }, // 1 month 10 days from paidAt
    },
    secondInstallment: {
      paid: { type: Boolean, default: false },
      paidAt: { type: Date, default: null },
    },

    dashboardBlocked: { type: Boolean, default: false },
     
    course: {
      type: String,
      required: true,
        default: "Not Selected",

      enum: ["Java Full Stack", "MERN"], 
    },
  },
  
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
