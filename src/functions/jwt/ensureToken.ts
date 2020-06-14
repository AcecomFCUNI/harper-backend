import { NextFunction as Next, Response } from 'express'
import { Request } from '../../custom/express.request'
import { response } from '../../network/response'

const ensureToken = (req: Request, res: Response, next: Next): void => {
  const { headers: { authorization: bearerHeader } } = req

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    req.token = bearerToken
  } else
    response(
      true,
      {
        message: 'You are not allowed to use this endpoint.'
      },
      res,
      403
    )
    // TODO: send a report that someone try to access to a route.
  next()
}

export { ensureToken }
