import User from "../Model/User.js";



export const adminMiddleware = (req, res, next) => {
  try {
    
    const adminEmails = [
      "anuragt2611@gmail.com",
      "st17931@gmail.com"
    ];

    
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized: No user email found" });
    }

    if (!adminEmails.includes(userEmail)) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
