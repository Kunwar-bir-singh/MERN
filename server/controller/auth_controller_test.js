const User = require("../models/user_model");
const Provider = require("../models/provider_model.");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const emailVerification = async (req, res) => {
    console.log(process.env.GMAIL, process.env.GMAIL_PASSWORD);
  const userEmail = req.body.userEmail;

  let config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  
//   let Mailgenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Mailgen",
//       link: "https://mailgen.js/",
//     },
//   });

//   let response = {
//     body: {
//       name : "Kunwarbir Singh",
//       intro: "Your mail has arrived.",
//       table: {
//         data: [
//           {
//             item: "Nodemailer working",
//             description: "Checking whether nodemailer works or not",
//             price: "Not Really",
//           },
//         ],
//       },
//       outro: "Outro has yeh bkl",
//     },
//   };

//   let mail = Mailgenerator.generate(response);
//   let msg = {
//     from: process.env.GMAIL,
//     to: userEmail,
//     subject: "Email Verification",
//     html: mail,
//   };

//   transporter
//     .sendMail(msg)
//     .then(() => {
//       console.log("Email Verification Sent");
//       return res.status(200).json({ msg: "Email Verification Sent" });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ msg: "Failed to send Email Verification" });
//     });
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `Maddison Foo Koch 👻" ${process.env.GMAIL} `, // sender address
      to: "www.kunwarbirsingh24@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  main().catch(console.error);
};

module.exports = {
    emailVerification
}