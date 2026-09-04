// server.js
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(bodyParser.json());

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.yourmailserver.com",
  port: 465,
  secure: true, // use SSL/TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Feedback route
app.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Send feedback to support team
    await transporter.sendMail({
      from: `"Feedback Bot" <${process.env.SMTP_USER}>`,
      to: "support@yourdomain.com",
      subject: `New Feedback from ${name}`,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Auto‑reply to user
    await transporter.sendMail({
      from: `"Support Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for your feedback",
      html: `
        <h2>Hello ${name},</h2>
        <p>We’ve received your feedback and our team will review it shortly.</p>
        <p>Here’s a copy of your message:</p>
        <blockquote>${message}</blockquote>
        <p>Best regards,<br>Support Team</p>
      `
    });

    res.json({ success: true, message: "Feedback sent and confirmation email delivered!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending feedback." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
