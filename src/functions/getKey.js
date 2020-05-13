import { KeysModel } from '../database/mongo/models/keys'
import { keyGen } from './keyGen'
import { mailer } from './mailer'

const PORT = process.env.PORT
const receivers = [
  process.env.EMAIL_RECEIVER_1,
  process.env.EMAIL_RECEIVER_2,
  process.env.EMAIL_RECEIVER_4
]

const getKey = async () => {
  try {
    const keys = await KeysModel.find({})

    if(keys.length === 0)
      try {
        const result = await keyGen()

        return result
      } catch (err) {
        console.log('Error at keyVerify.js -> Generating the key')
        console.error(err)
      }
    else {
      const token = keys[0].key

      const result = await mailer(
        'Bearer to update the database',
        `There was a password stored in the database:\n${token}`,
        (PORT === '4001')
          ? `${receivers[0]}` // To the developer
          : `${receivers[0]}, ${receivers[1]}, ${receivers[3]}` // To the team
      )

      return result
    }
  } catch (err) {
    console.log('Error at keyVerify.js -> Getting the key')
    console.error(err)
  }
}

export { getKey }
