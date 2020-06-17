/* eslint-disable class-methods-use-this */
import { DtoMail } from '../dto-interfaces/mail.dto'
import { mailer } from '../functions/mail/mailer'

const receivers = [
  process.env.EMAIL_RECEIVER_1,
  process.env.EMAIL_RECEIVER_2,
  process.env.EMAIL_RECEIVER_3,
  process.env.EMAIL_RECEIVER_4
]
class ContactUs {
  private _args: DtoMail

  constructor (args: DtoMail) {
    this._args = args
  }

  public async process (type: string): Promise<void | unknown> {
    const { data } = this._args

    if (type === 'mail') {
      const result = await this.mail(data)

      return result
    }
    const result = await new Promise(r =>
      setTimeout(() => r('The key has been already sent'), 0)
    )

    return result
  }

  async mail (data: DtoMail['data']): Promise<void> {
    const { lastName, mail, message, name, subject } = data

    // if(!lastName || !mail || !message || !name || !subject)
    //   throw new Error('All the parameters are mandatory!')

    try {
      const result = await mailer(
        subject as string,
        // eslint-disable-next-line max-len
        `Message from: ACECOM's web page\nContact info:\nFull name: ${name} ${lastName}\nEmail: ${mail}\nMessage: ${message}`,
        `${receivers[0]}, ${receivers[1]}, ${receivers[2]}, ${receivers[3]}`
      )

      return result
    } catch (error) {
      console.log('There was a problem while trying to send the message')

      throw error
    }
  }
}

export { ContactUs }
