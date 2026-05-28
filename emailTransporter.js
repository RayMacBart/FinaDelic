const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   host: "smtp.ionos.de",
   port: 587,
   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
   auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
   },
});

module.exports = transporter;