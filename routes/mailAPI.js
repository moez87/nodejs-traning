const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require('path');
const fs= require('fs');
const ejs= require('ejs');
const passport = require('passport');

router.get('/sendMail', async (req, res) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "harrabimoez87@gmail.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello Moez?", // plain text body
    html: "<b>welcome</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.json({ message: 'Mail sent' })
});


router.get('/sendMailV2', passport.authenticate('bearer', { session: false }), async (req, res) => {

 


  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  });
  const templatePath = path.resolve('./mail_templates','register.html');
  console.log(templatePath)
  const registerTemplate = fs.readFileSync(templatePath,{encoding:"utf-8"});
  console.log(registerTemplate);
  const render = ejs.render(registerTemplate,{name: "moez"}); 

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "harrabimoez87@gmail.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello Moez?",
    // html: registerTemplate,
    html: render,
    attachments:[

      {
        filename:'ramadan.png',
        path:'./ramadan.png'
      }
    ]
  });

  res.json({ message: 'Mail sent' })
});



module.exports = router;