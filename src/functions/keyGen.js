/* eslint-disable max-len */
import jwt from 'jsonwebtoken'
import { mailer } from './mailer'

const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRETE_KEY
const ID = process.env.ID
const receivers = [
  process.env.EMAIL_RECEIVER_1,
  process.env.EMAIL_RECEIVER_2,
  process.env.EMAIL_RECEIVER_4
]

const keyGen = async () => {
  try {
    const token = jwt.sign({ id: ID }, SECRET_KEY)

    const result = await mailer(
      'New bearer to update the database',
      (PORT === '4001')
        ? `This bearer is just for testing purposes.\nThe new password to update the database: \n${token}`
        : `This bearer is ready to be used in productions.\nThe new password to update the database: \n${token}`,
      (PORT === '4001')
        ? `${receivers[0]}` // To the developer
        : `${receivers[0]}, ${receivers[1]}, ${receivers[3]}` // To the team
    )

    return result
  } catch (err) {
    console.log('Error at keyGen.js')
    console.error(err)
  }
}

export { keyGen }