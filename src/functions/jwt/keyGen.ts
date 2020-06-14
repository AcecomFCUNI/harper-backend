/* eslint-disable max-len */
import jwt from 'jsonwebtoken'
import { mailer } from '../mail/mailer'
import { IKeys, KeysModel } from '../../models/keys'

const { PORT, ID, SECRET_KEY } = process.env
const receivers = [
  process.env.EMAIL_RECEIVER_1 as string,
  process.env.EMAIL_RECEIVER_2 as string,
  process.env.EMAIL_RECEIVER_4 as string
]

const keyGen = async (): Promise<void | IKeys> => {
  const token = jwt.sign({ id: ID }, SECRET_KEY as string)
  const km = new KeysModel({
    key    : token,
    purpose: PORT === '4001' ? 'dev' : 'prod'
  })

  try {
    const result = await km.save()
    try {
      await mailer(
        'New bearer to update the database',
        PORT === '4001'
          ? `This bearer is just for testing purposes.\nThe new password to update the database: \n${token}`
          : `This bearer is ready to be used in production.\nThe new password to update the database: \n${token}`,
        PORT === '4001'
          ? `${receivers[0]}` // To the developer
          : `${receivers[0]}, ${receivers[1]}, ${receivers[2]}` // To the team
      )
    } catch (err) {
      console.log('Error at keyGen.js -> Sending the mail')

      throw err
    }

    return result
  } catch (error) {
    console.log('Error at keyGen.js -> Saving the key.')

    throw error
  }
}

export { keyGen }
