const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "magreth.quintero9128@ucaldas.edu.co",
      pass: "vahx qeej hwxg neox",
    },
  });

  transporter.verify().then( () => {
    console.log ('Ready for send email');
  });

  module.exports = transporter;

  