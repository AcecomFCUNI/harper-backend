import nodemailer from 'nodemailer'

const EMAIL_SENDER = process.env.EMAIL_SENDER as string
const PASSWORD = process.env.PASSWORD as string

const mailer = async (
  subject: string,
  text   : string,
  to     : string,
  html?  : string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    auth: {
      pass: PASSWORD,
      user: EMAIL_SENDER
    },
    service: 'Gmail'
  })

  const mailOptions = {
    from  : `ACECOM <${EMAIL_SENDER}>`,
    html  : html || '',
    sender: EMAIL_SENDER,
    subject,
    text,
    to
  }

  try {
    const result = await transporter.sendMail(mailOptions)

    return result
  } catch (err) {
    console.log('Error at mailer.js')

    throw err
  }
}

export { mailer }
