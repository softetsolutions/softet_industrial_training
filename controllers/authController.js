import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Model/User.js";
import { nanoid } from "nanoid";

export const signup = async (req, res) => {
  try {
    const { name, email, number, password, referredBy, course } = req.body;

    if (!name || !email || !number || !password || !course) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!["Java Full Stack", "MERN"].includes(course)) {
      return res.status(400).json({ message: "Invalid course selection" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }
    let validReferrer = null;
    if (referredBy) {
      validReferrer = await User.findOne({ referralCode: referredBy });
      if (!validReferrer) {
        return res.status(400).json({ message: "Invalid referral code" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = nanoid(8);
    await User.create({
      name,
      email,
      number,
      password: hashedPassword,
      referralCode,

      referredBy: referredBy || null,
      course,
    });

    res.status(201).json({
      message: "Signup successful",
      referredBy: referredBy || null,
      course,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          number: user.number,
          firstInstallmentPaid: user.firstInstallment.paid,
          course: user.course,
        },
        token,
      });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
export const getMyProfile = async (req, res) => {
  if (!req.user.referralCode) {
    req.user.referralCode = nanoid(8);
    await req.user.save();
  }

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    referralCode: req.user.referralCode,
  });
};
export const getMyReferrals = async (req, res) => {
  try {
    const myCode = req.user.referralCode;

    const users = await User.find(
      { referredBy: myCode },
      "name email createdAt",
    );

    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getEnrolledReferralCount = async (req, res) => {
  try {
    const myCode = req.user.referralCode;

    const count = await User.countDocuments({
      referredBy: myCode,
      "firstInstallment.paid": true,
    });

    res.json({
      referralCode: myCode,
      enrolledReferralCount: count,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getSecondInstallmentPriceToPayByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("referralCode");
    if (!user) {
      throw new Error("User not found");
    }
    const count = await User.countDocuments({
      referredBy: user.referralCode,
    });
    res.status(200).json({
      referralCount: count,
      secondInstallmentAmount: 3500 - count * 500,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
