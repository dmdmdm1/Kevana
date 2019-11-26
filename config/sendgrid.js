const nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");

var options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
};

let transporter = nodemailer.createTransport(sgTransport(options));

module.exports = async function sendEmail(email, name) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kevana" <hello@kevana.com', // sender address
    to: email, // list of receivers
    subject: "Welcome!", //subject line
    text: `Hello ${name}, 
    a lovely welcome to Kevana!`, // plain text body
    html: `<h1>Hello ${name}, </h1> ... <p>Hello ${name}, welcome to Kevana.
    </p>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
