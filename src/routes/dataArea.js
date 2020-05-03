import { Router } from 'restify-router'
import { DataArea } from '../controllers/dataArea'

const router = new Router()
const da = new DataArea()

router.get('/dataArea', (req, res, next) => {
  res.send({ message: 'This is the endpoint to upload data of an area.' })
})

router.post('/dataArea', async (req, res, next) => {
  const { body: { args } } = req

  try {
    const result = await da.process(args)

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

export { router as DataArea }
