import { Request } from 'express'

interface RequestCustom extends Request {
  token?: string
}

export { RequestCustom as Request }

// declare namespace Express {
//   export interface Request {
//     token?: string
//   }
// }

