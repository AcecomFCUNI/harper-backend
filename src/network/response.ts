import { Response } from 'express'

const response = (
  error  : boolean,
  message: Record<string, unknown> | string,
  res    : Response,
  status : number
) => {
  res.status(status).send({ error, message })
}

export { response }
