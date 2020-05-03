import { Router } from 'restify-router'
import { MemberStatus } from '../controllers/memberStatus'

const router = new Router()
const ms = new MemberStatus()

router.get('/memberStatus', (req, res, next) => {
  res.send('This is the endpoint that returns the member status data.')
})

router.post('/memberStatus', async (req, res, next) => {
  const { body: { args } } = req

  try {
    const result = await ms.process(args)

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

export { router as MemberStatus }
