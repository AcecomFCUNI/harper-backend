import { Router } from 'restify-router'
import { ContactUs } from '../controllers/contactUs'

const router = new Router()
const cu = new ContactUs()

router.get('/contactUs', (req, res) => {
  res.send({
    message: 'This is the endpoint to contact to ACECOM'
  })
})

router.post('/contactUs', async (req, res, next) => {
  const { body: { args } } = req

  try {
    const result = await cu.process(args)

    res.send(200, {
      error  : false,
      message: result
    })
  } catch (err) {
    res.send(500, {
      error  : true,
      message: err.message
    })
  }
})

export { router as ContactUs }
