// import PDFDocument from "pdfkit";
// import path from "path";
// import fs from "fs";

// export const downloadAppointmentLetterHandler = async (req, res) => {
//   try {
//     // 🔹 Normally fetched using studentId from DB
//     const data = {
//       studentName: "Rahul Sharma",
//       courseName: "MERN Stack Development",
//       joiningDate: "01 March 2025",
//       duration: "6 Months",
//       issueDate: "18 February 2025",
//       appointmentId: "SS-APT-2025-0142",
//     };

//     // 🔹 Asset paths
//     const logoPath = path.join(process.cwd(), "assets/softet-logo.jpeg");
//     const stampPath = path.join(
//       process.cwd(),
//       "assets/softet-solutions-stamp.png"
//     );

//     // 🔹 Validate assets
//     [logoPath, stampPath].forEach((file) => {
//       if (!fs.existsSync(file)) {
//         throw new Error(`Missing asset: ${file}`);
//       }
//     });

//     // 🔹 IMPORTANT HEADERS (THIS TRIGGERS DOWNLOAD)
//     res.writeHead(200, {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename="${data.studentName.replace(
//         /\s+/g,
//         "_"
//       )}_Appointment_Letter.pdf"`,
//       "Cache-Control": "no-store",
//     });

//     const doc = new PDFDocument({ size: "A4", margin: 50 });

//     // 🔹 Pipe PDF stream directly to response
//     doc.pipe(res);

//     /* ================= HEADER ================= */

//     doc.image(logoPath, 50, 40, { width: 110 });

//     doc.font("Times-Bold").fontSize(16).text("Softet Solutions", 200, 45);
//     doc
//       .font("Times-Roman")
//       .fontSize(10)
//       .text("IT & Software Development Company", 200, 65);

//     doc.moveDown(4);

//     /* ================= META ================= */

//     doc
//       .fontSize(10)
//       .text(`Appointment ID: ${data.appointmentId}`, { align: "right" })
//       .text(`Date: ${data.issueDate}`, { align: "right" });

//     doc.moveDown(2);

//     /* ================= TITLE ================= */

//     doc.font("Times-Bold").fontSize(14).text("APPOINTMENT LETTER", {
//       align: "center",
//       underline: true,
//     });

//     doc.moveDown(2);

//     /* ================= BODY ================= */

//     doc.font("Times-Roman").fontSize(12);

//     doc.text(`Dear ${data.studentName},`);
//     doc.moveDown(1);

//     doc.text(
//       `We are pleased to inform you that you have been appointed as a Trainee at Softet Solutions for the course "${data.courseName}". Your training will commence from ${data.joiningDate} for a duration of ${data.duration}.`,
//       { align: "justify" }
//     );

//     doc.moveDown(1);

//     doc.text(
//       "During the training period, you will work on real-world projects and gain hands-on experience under the guidance of our technical team. This appointment is strictly for training purposes and does not guarantee permanent employment.",
//       { align: "justify" }
//     );

//     doc.moveDown(1);

//     doc.text(
//       "You are expected to maintain discipline, adhere to company policies, and complete assigned responsibilities sincerely throughout the training period.",
//       { align: "justify" }
//     );

//     doc.moveDown(2);

//     doc.text(
//       "We wish you great success and a valuable learning experience with Softet Solutions.",
//       { align: "justify" }
//     );

//     doc.moveDown(3);

//     /* ================= SIGNATURE & STAMP ================= */

//     doc.text("Sincerely,");
//     doc.moveDown(2);

//     // Stamp (overlapping for realism)
//     doc.image(stampPath, 350, doc.y - 40, {
//       width: 100,
//       opacity: 0.85,
//     });

//     doc.moveDown(4);

//     doc.font("Times-Bold").text("Authorized Signatory");
//     doc.font("Times-Roman").text("HR Manager").text("Softet Solutions");

//     /* ================= FOOTER ================= */

//     doc.fontSize(9);
//     doc.text("Softet Solutions | www.softetsolutions.com", 50, 760, {
//       align: "center",
//     });
//     doc.text("Lucknow, Uttar Pradesh | GSTIN: 09CFYPT0083D1ZX", {
//       align: "center",
//     });

//     // 🔹 END STREAM
//     doc.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Failed to download appointment letter",
//       error: error.message,
//     });
//   }
// };

import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import User from "../Model/User.js";
import mongoose from "mongoose";
export const downloadAppointmentLetterHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const year = new Date().getFullYear();

    const shortId = user._id.toString().slice(-4).toUpperCase();

    const appointmentId = `SS-APT-${year}-${shortId}`;

    const data = {
      studentName: user.name,
      courseName: user.course,
      joiningDate: "05 January 2026",
      duration: "3 Months",
      issueDate: "05 January 2026",
      appointmentId,
    };

    const logoPath = path.join(process.cwd(), "assets/softet-logo.png");
    const stampPath = path.join(
      process.cwd(),
      "assets/softet-solutions-stamp.png"
    );

    if (!fs.existsSync(logoPath) || !fs.existsSync(stampPath)) {
      throw new Error("Logo or stamp missing");
    }

    /* ================= RESPONSE HEADERS ================= */

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${data.studentName.replace(
        /\s+/g,
        "_"
      )}_Appointment_Letter.pdf"`,
    });

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    doc.pipe(res);

    const pageWidth = doc.page.width;
    const contentWidth = 420;
    const centerX = (pageWidth - contentWidth) / 2;

    doc.image(logoPath, 50, 45, { width: 70 });

    // Company info (RIGHT)
    doc.font("Times-Bold").fontSize(16).text("Softet Solutions", 140, 45, {
      align: "right",
    });

    doc
      .font("Times-Roman")
      .fontSize(10)
      .text("IT & Software Development Company", 140, 65, {
        align: "right",
      });

    doc
      .fontSize(10)
      .text(`Appointment ID: ${data.appointmentId}`, 140, 85, {
        align: "right",
      })
      .text(`Date: ${data.issueDate}`, 140, 100, {
        align: "right",
      });

    doc.moveDown(4);

    /* ================= TITLE ================= */

    doc.font("Times-Bold").fontSize(14).text("APPOINTMENT LETTER", {
      align: "center",
      underline: true,
    });

    doc.moveDown(2);

    /* ================= BODY (CENTERED BLOCK) ================= */

    doc.font("Times-Roman").fontSize(12);

    doc.text(`Dear ${data.studentName},`, centerX, doc.y, {
      width: contentWidth,
      align: "left",
    });

    doc.moveDown(1);

    doc.text(
      `We are pleased to inform you that you have been appointed as a Trainee at Softet Solutions for the course "${data.courseName}". Your training will commence from ${data.joiningDate} for a duration of ${data.duration}.`,
      centerX,
      doc.y,
      { width: contentWidth, align: "justify" }
    );

    doc.moveDown(1);

    doc.text(
      "During the training period, you will work on real-world projects and gain hands-on experience under the guidance of our technical team. This appointment is strictly for training purposes and does not guarantee permanent employment.",
      centerX,
      doc.y,
      { width: contentWidth, align: "justify" }
    );

    doc.moveDown(1);

    doc.text(
      "You are expected to maintain discipline, adhere to company policies, and complete assigned responsibilities sincerely throughout the training period.",
      centerX,
      doc.y,
      { width: contentWidth, align: "justify" }
    );

    doc.moveDown(1);

    doc.text(
      "We wish you great success and a valuable learning experience with Softet Solutions.",
      centerX,
      doc.y,
      { width: contentWidth, align: "justify" }
    );

    doc.moveDown(3);

    /* ================= SIGNATURE & STAMP ================= */

    doc.text("Sincerely,", centerX, doc.y, {
      width: contentWidth,
      align: "left",
    });

    const sincerelyY = doc.y;
    doc.moveDown(1.5);

    // Stamp directly under "Sincerely"
    doc.image(stampPath, centerX, sincerelyY + 15, {
      width: 50,
      opacity: 0.9,
      align: "center",
    });

    doc.moveDown(4);

    doc.font("Times-Bold").text("Authorized Signatory", centerX, doc.y, {
      width: contentWidth,
      align: "left",
    });

    doc
      .font("Times-Roman")
      .text("CEO", centerX, doc.y, {
        width: contentWidth,
        align: "left",
      })
      .text("Softet Solutions", centerX, doc.y, {
        width: contentWidth,
        align: "left",
      });

    /* ================= FOOTER ================= */

    doc.fontSize(9);

    doc.text("Softet Solutions | www.softetsolutions.com", 50, 760, {
      align: "center",
    });

    doc.text("Varanasi, Uttar Pradesh | GSTIN: 09CFYPT0083D1ZX", {
      align: "center",
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to generate appointment letter",
      error: error.message,
    });
  }
};
