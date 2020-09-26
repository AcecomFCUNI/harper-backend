import { CronJob } from 'cron'
import { mailer } from '../mail/mailer'
import { MembersModel } from '../../models/members'

const birthdayChecker = new CronJob('00 00 5 * * *', async () => {
  const currentDate = new Date(new Date().getTime())
  let day: string
  let month: string

  if (currentDate.getMonth() >= 10)
    month = (currentDate.getMonth() + 1).toString()
  else
    month = `0${currentDate.getMonth() + 1}`

  if (currentDate.getUTCDate() >= 10)
    day = currentDate.getUTCDate().toString()
  else
    day = `0${currentDate.getUTCDate()}`

  const chosenMembers = await MembersModel.find({}, '-_id name birthday email')

  const chosenMember = chosenMembers.filter(member => {
    const memberBirthday = member.birthday
      .toISOString()
      .slice(0, 10)
      .split('-')
      .slice(1, 3)
      .toString()

    return memberBirthday === `${month},${day}`
  })

  const result = await mailer(
    '¡Feliz cumpleaños!',
    `De parte de ACECOM, deseamos que pases un lindo día :)
¡Feliz cumpleaños ${chosenMember[0].name.split(' ')[0]}!`,
    `${chosenMember[0].email[0]}`
  )

  console.log(result)
})

export { birthdayChecker }
