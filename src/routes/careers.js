import { Router } from 'restify-router'
import { Careers } from '../controllers/careers'

const router = new Router()
const c = new Careers()

router.get('/careers', (req, res, next) => {
  res.send('This is the endpoint to upload the careers in the database')
})

router.post('/careers', async (req, res, next) => {
  const { body: { args } } = req

  try {
    let result = await c.process(args)

    if(Array.isArray(result)) {
      result = result.map(({ code, name }) => {
        return {
          code,
          name
        }
      })
      res.send({
        error: false,
        result
      })
    } else
      res.send({
        error : false,
        result: {
          code: result.code,
          name: result.name
        }
      })
  } catch (err) {
    res.send({
      error  : true,
      message: err.message
    })
  }
})

export { router as Careers }
