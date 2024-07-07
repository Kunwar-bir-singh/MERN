const User = require("../models/user_model");
const Provider = require("../models/provider_model.");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const emailVerification = async (req, res) => {
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

  function generateEmailCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  let emailCode = generateEmailCode();
  async function main() {
    const info = await transporter.sendMail({
      from: `Kunwarbir Singh 🤠" ${process.env.GMAIL} `,
      to: "www.kunwarbirsingh24@gmail.com",
      subject: "Verification Mail",
      text: "Hello world?",
      html: `Your Verification Code is <b>${emailCode}</b> `,
    });

    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
  console.log("Email sent: sucessfully." );
  return res
    .status(200)
    .json({ msg: "Email Verification Sent", emailCode: emailCode, code: 1 });
};

module.exports = {
  emailVerification,
};
