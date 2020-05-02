import { Router } from 'restify-router'
const router = new Router()

router.get('', (req, res, next) => {
  res.json({
    message: 'Welcome to the new version of HARPER'
  })
})

export { router as Home }
