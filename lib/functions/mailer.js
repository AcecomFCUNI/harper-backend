"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailer = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const PASSWORD = process.env.PASSWORD;

const mailer = async (subject, text, to) => {
  const transporter = _nodemailer.default.createTransport({
    auth: {
      pass: PASSWORD,
      user: EMAIL_SENDER
    },
    service: 'Gmail'
  });

  const mailOptions = {
    EMAIL_SENDER,
    subject,
    text,
    to
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log('Error at mailer.js');
    console.error(err);
  }
};

exports.mailer = mailer;