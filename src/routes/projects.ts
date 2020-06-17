import jwt from 'jsonwebtoken'
import { Response, Router } from 'express'
import { Request } from '../custom/express.request'

import { Projects } from '../controllers/projects'
import { response } from '../network/response'
import { ensureToken } from '../functions/jwt/ensureToken'
import { toTitleCase } from '../functions/utils/titleCase'

const SECRETE_KEY = process.env.SECRETE_KEY as string
const router = Router()

router.get('/projects', (req: Request, res: Response) => {
  response(
    false,
    'This is the endpoint to upload the projects from ACECOM\'s areas',
    res,
    200
  )
})

router.post('/projects', ensureToken, async (req: Request, res: Response) => {
  const { body: { args }, token } = req
  const { type } = args
  const p = new Projects(args)

  jwt.verify(token as string, SECRETE_KEY, async (error, jwtData) => {
    if (error) {
      console.log(error)
      response(true, { message: toTitleCase(error.message) }, res, 403)
    } else {
      try {
        const result = await p.process(type)
        // TODO: Update status depending of the args
        response(false, { result }, res, 200)
      } catch (err) {
        response(true, { message: err.message }, res, 500)
        }
      // TODO: learn what to do with the data
      console.log(jwtData)
    }
  }
  )
})

export { router as Projects }
