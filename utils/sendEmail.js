"use strict";
const nodemailer = require("nodemailer");

// Load env vars
const SMTP_HOST = require('../config/keys').SMTP_HOST;
const SMTP_PORT = require('../config/keys').SMTP_PORT;
const SMTP_EMAIL = require('../config/keys').SMTP_EMAIL;
const SMTP_PASSWORD = require('../config/keys').SMTP_PASSWORD;
const FROM_NAME = require('../config/keys').FROM_NAME;
const FROM_EMAIL = require('../config/keys').PROM_EMAIL;


const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_EMAIL, // generated ethereal user
      pass: SMTP_PASSWORD, // generated ethereal password
    },
  });

  const message = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`, // sender address
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
