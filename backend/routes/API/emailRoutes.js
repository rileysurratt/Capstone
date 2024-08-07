const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

router.post('/send-email', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const { subject, text } = req.body;

  const mailOptions = {
    from,
    to: process.env.RECIPIENT_EMAIL, 
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
