"use strict";
const nodemailer = require("nodemailer");
const appPwd = "tlckpklexhcvikuh";

// async..await is not allowed in global scope, must use a wrapper
async function SendEmail(recipient, htmlStr) {
  if (!recipient) return;
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "antoniuspetrus.ap@gmail.com", // generated ethereal user
      pass: appPwd, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Antonius Petrus" <antoniuspetrus.ap@gmail.com>', // sender address
    to: recipient, // list of receivers
    subject: "Account Verification for social-media-app", // Subject line
    html: htmlStr, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = function (app) {
  app.route("/email/send-verification").post(function (req, res) {
    if (!req.body.recipient) {
      res.status(400).send({
        messsage: "recipient is required",
        status: "error",
        success: false,
      });
      return;
    }
    if (!req.body.link) {
      res.status(400).send({
        messsage: "link is required",
        status: "error",
        success: false,
      });
      return;
    }

    const htmlStr = `<html lang="en"><head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification social-media-app</title>
  </head>
  
  <body>
      Here is your verification link, Click here to <a href="${req.body.link}"><button>Activate</button></a> your account.<br>
      Click this link if button is not working ${req.body.link}
  
  </body></html>`;

    SendEmail(req.body.recipient, htmlStr).catch(function (err) {
      console.log(err);
    });

    res.status(200).send({
      messsage: "success send email",
      status: "ok",
      success: true,
    });
  });

  app.route("/email/forgot-password").post(function (req, res) {
    if (!req.body.recipient) {
      res.status(400).send({
        messsage: "recipient is required",
        status: "error",
        success: false,
      });
      return;
    }
    if (!req.body.link) {
      res.status(400).send({
        messsage: "link is required",
        status: "error",
        success: false,
      });
      return;
    }

    const htmlStr = `<html lang="en"><head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password social-media-app</title>
  </head>
  
  <body>
      Here is your reset password link, Click here to <a href="${req.body.link}"><button>Reset Password</button></a> of your account.<br>
      Click this link if button is not working ${req.body.link}
  
  </body></html>`;

    SendEmail(req.body.recipient, htmlStr).catch(function (err) {
      console.log(err);
    });

    res.status(200).send({
      messsage: "success send email",
      status: "ok",
      success: true,
    });
  });
};
