import { Router } from 'restify-router'
import { DataMembers } from '../controllers/dataMembers'

const router = new Router()
const d = new DataMembers()

router.get('/dataMembers', (req, res, next) => {
  res.send({ message: 'This is the endpoint that returns the members data.' })
})

router.post('/dataMembers', async (req, res, next) => {
  const { body: { args } } = req

  try {
    const result = await d.process(args)

    res.send({
      error: false,
      result
    })
  } catch (err) {
    res.send({
      error  : true,
      message: err.message
    })
  }
})

export { router as DataMembers }
