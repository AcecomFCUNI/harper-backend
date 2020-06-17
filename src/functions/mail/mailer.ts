import nodemailer from 'nodemailer'

const EMAIL_SENDER = process.env.EMAIL_SENDER as string
const PASSWORD = process.env.PASSWORD as string

const mailer = async (
  subject: string,
  text   : string,
  to     : string
): Promise<void> => {
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

    throw err
  }
}

export { mailer }
