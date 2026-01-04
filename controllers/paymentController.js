import User from "../Model/User.js";
export const payFirstInstallment = async (req, res) => {
  try {
    const user = req.user;

    if (user.firstInstallment.paid) {
      return res.status(400).json({ message: "First installment already paid" });
    }

    const now = new Date();
    const accessEnd = new Date();
    accessEnd.setMonth(accessEnd.getMonth() + 1);
    accessEnd.setDate(accessEnd.getDate() + 10);

    user.firstInstallment = {
      paid: true,
      paidAt: now,
      accessEnd,
    };
    user.dashboardBlocked = false; // allow access
    await user.save();

    res.json({ message: "First installment paid successfully", accessEnd });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const paySecondInstallment = async (req, res) => {
  try {
    const user = req.user;

    if (!user.firstInstallment.paid) {
      return res.status(400).json({ message: "First installment not paid yet" });
    }

    if (user.secondInstallment.paid) {
      return res.status(400).json({ message: "Second installment already paid" });
    }

    user.secondInstallment.paid = true;
    user.secondInstallment.paidAt = new Date();
    user.dashboardBlocked = false; // allow access after payment
    await user.save();

    res.json({ message: "Second installment paid successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
