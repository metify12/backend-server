const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async ({email, subject, text}) => {

  const message = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    text
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent');
};

module.exports = sendEmail;
// shift + alt + f to format codes
