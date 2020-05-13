import nodemailer from 'nodemailer'

const EMAIL_SENDER = process.env.EMAIL_SENDER
const PASSWORD = process.env.PASSWORD

const mailer = async (subject, text, to) => {
  const transporter = nodemailer.createTransport({
    auth: {
      pass: PASSWORD,
      user: EMAIL_SENDER
    },
    service: 'Gmail'
  })

  const mailOptions = { EMAIL_SENDER, subject, text, to }

  try {
    const result = await transporter.sendMail(mailOptions)

    return result
  } catch (err) {
    console.log('Error at mailer.js')
    console.error(err)
  }
}

export { mailer }
