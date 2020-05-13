import jwt from 'jsonwebtoken'

import { Router } from 'restify-router'
import { MemberStatus } from '../controllers/memberStatus'

import { response } from '../functions/response'
import { ensureToken } from '../functions/ensureToken'
import { toTitleCase } from '../functions/titleCase'

const SECRETE_KEY = process.env.SECRETE_KEY
const router = new Router()
const ms = new MemberStatus()

router.get('/memberStatus', (req, res, next) => {
  response(res, 200, false, {
    message: 'This is the endpoint that returns the member status data'
  })
})

router.post('/memberStatus', ensureToken, async (req, res, next) => {
  const { body: { args }, token } = req

  jwt.verify(
    token,
    SECRETE_KEY,
    async (err, data) => {
      if(err) {
        console.log(err)
        response(res, 403, true, { message: toTitleCase(err.message) })
      } else {
        try {
          const result = await ms.process(args)

          // TODO: Update status depending of the args
          response(res, 200, false, { result })
        } catch (err) {
          response(res, 500, true, { message: err.message })
        }
        // TODO: learn what to do with the data
        console.log(data)
      }
    }
  )
})

export { router as MemberStatus }
