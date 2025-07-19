import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // 465일 경우 반드시 true
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  // SMTP 연결 확인
  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP 연결 실패:", error);
    } else {
      console.log("SMTP 연결 성공:", success);
    }
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // 발신자 이메일 (자기 자신)
    to: process.env.EMAIL_TO || process.env.EMAIL_USER, // 받는 사람
    subject: `Contact from ${name}`,
    text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email.", error: error.message });
  }
});

export default router;
