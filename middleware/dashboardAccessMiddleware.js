import User from "../Model/User.js";
export const dashboardAccessMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    // Check first installment
    if (user.firstInstallment.paid) {
      const now = new Date();
      if (now <= new Date(user.firstInstallment.accessEnd)) {
        return next(); 
      } else if (!user.secondInstallment.paid) {
        user.dashboardBlocked = true; 
        await user.save();
        return res.status(403).json({ message: "First installment expired. Pay second installment to continue." });
      } else {
        return next(); 
      }
    }

    return res.status(403).json({ message: "Dashboard access denied. Pay first installment to continue." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
