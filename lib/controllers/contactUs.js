"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactUs = void 0;

var _mailer = require("../functions/mailer");

const receivers = [process.env.EMAIL_RECEIVER_1, process.env.EMAIL_RECEIVER_2, process.env.EMAIL_RECEIVER_3, process.env.EMAIL_RECEIVER_3];

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

    try {
      const result = await (0, _mailer.mailer)(subject, // eslint-disable-next-line max-len
      `Message from: ACECOM's web page\nContact info:\nFull name: ${name} ${lastName}\nEmail: ${mail}\nMessage: ${message}`, `${receivers[0]}, ${receivers[1]}, ${receivers[2]}, ${receivers[3]}`);
      return result;
    } catch (err) {
      if (err.message) throw err;
      throw new Error('There was a problem while trying to send the message');
    }
  }

}

exports.ContactUs = ContactUs;