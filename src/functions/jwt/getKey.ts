import { IKeys, KeysModel } from '../../models/keys'
import { keyGen } from './keyGen'
import { mailer } from '../mail/mailer'

const { PORT } = process.env
const receivers = [
  process.env.EMAIL_RECEIVER_1 as string,
  process.env.EMAIL_RECEIVER_2 as string,
  process.env.EMAIL_RECEIVER_4 as string
]

const getKey = async (): Promise<void | unknown> => {
  let storedKeys: IKeys | null
  try {
    storedKeys = await KeysModel.findOne(
      { purpose: { $eq: 'prod' } },
      'key delivered'
    ).sort({
      createdAt: -1
    })
  } catch (error) {
    console.log('Error at getKey.js -> Getting the key')

    throw error
  }
  if (!storedKeys)
    try {
      const result = await keyGen()

      return result
    } catch (err) {
      console.log('Error at getKey.js -> Generating the key')

      throw err
    }
  else {
    const token = storedKeys.key
    if (!storedKeys.delivered)
      try {
        await mailer(
          'Bearer to update the database',
          `There was a password stored in the database:\n${token}`,
          PORT === '4001'
            ? `${receivers[0]}` // To the developer
            : `${receivers[0]}, ${receivers[1]}, ${receivers[3]}` // To the team
        )
      } catch (error) {
        console.log('Error at getKey.js -> Sending the mail')

        throw error
      }
    const result = await new Promise(r =>
      setTimeout(() => r('The key has been already sent'), 0)
    )

    return result
  }
}

export { getKey }
