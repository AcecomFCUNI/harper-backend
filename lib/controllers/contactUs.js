"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactUs = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

class ContactUs {
  process(args) {
    const {
      type,
      data
    } = args;
    if (type === 'mail') return this.mail(data);
  }

  async mail(args) {
    const {
      lastName,
      mail,
      message,
      name,
      subject
    } = args;
    if (!lastName || !mail || !message || !name || !subject) throw new Error('All the parameters are mandatory!');

    const transporter = _nodemailer.default.createTransport({
      auth: {
        pass: PASSWORD,
        user: EMAIL
      },
      service: 'gmail'
    });

    const mailOptions = {
      from: 'ACECOM\'s web page',
      subject,
      // eslint-disable-next-line max-len
      text: `Message from: ACECOM's web page\nContact info:\nFull name: ${name} ${lastName}\nEmail: ${mail}\nMessage: ${message}`,
      to: 'sluzquinosa@uni.pe, bryan.ve.bv@gmail.com, acecom@uni.edu.pe'
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      return result;
    } catch (err) {
      if (err.message) throw err;
      throw new Error('There was a problem while trying to send the message');
    }
  }

}

exports.ContactUs = ContactUs;