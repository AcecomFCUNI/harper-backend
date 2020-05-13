import { Router } from 'restify-router'
import { response } from '../functions/response'

const router = new Router()

router.get('', (req, res, next) => {
  response(res, 200, false, {
    message: 'Welcome to the new version of HARPER'
  })
})

export { router as Home }
