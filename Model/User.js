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
    role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
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
    
    referralCount: {
      type: Number,
      default: 0,
    },

    wallet: {
      type: Number,
      default: 0, // total cashback amount
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
        //default: "Not Selected",

      enum: ["Java Full Stack", "MERN"], 
    },
  },
  
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
