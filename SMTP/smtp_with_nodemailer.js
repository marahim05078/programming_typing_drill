// server.js
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(bodyParser.json());

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.yourmailserver.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: true
  }
});

// Feedback route
app.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Feedback Bot" <${process.env.SMTP_USER}>`,
      to: "support@yourdomain.com",
      subject: `New Feedback from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    res.json({ success: true, message: "Feedback sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending feedback." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
