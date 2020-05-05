import { Router } from 'restify-router'
import { Projects } from '../controllers/projects'

const router = new Router()
const p = new Projects()

router.get('/projects', (req, res, next) => {
  res.send({
    message: 'This is the endpoint to upload the projects from ACECOM\'s areas.'
  })
})

router.post('/projects', async (req, res, next) => {
  const { body: { args } } = req

  try {
    const result = await p.process(args)

    res.send({
      error: false,
      result
    })
  } catch (err) {
    // console.log(err)
    res.send({
      error  : true,
      message: err.message
    })
  }
})

export { router as Projects }
