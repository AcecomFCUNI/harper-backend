import { Response, Request, Router } from 'express'
import { response } from '../network/response'

const router = Router()

router.get('', (req: Request, res: Response) => {
  response(
    false,
    'Welcome to the new version of HARPER',
    res,
    200
  )
})

export { router as Home }
