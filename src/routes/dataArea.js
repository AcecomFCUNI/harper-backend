import jwt from 'jsonwebtoken'

import { Router } from 'restify-router'
import { DataArea } from '../controllers/dataArea'

import { response } from '../functions/response'
import { ensureToken } from '../functions/ensureToken'
import { toTitleCase } from '../functions/titleCase'

const SECRETE_KEY = process.env.SECRETE_KEY
const router = new Router()
const da = new DataArea()

router.get('/dataArea', (req, res, next) => {
  response(res, 200, false, {
    message: 'This is the endpoint to upload data of an area'
  })
})

router.post('/dataArea', ensureToken, async (req, res, next) => {
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
          const result = await da.process(args)

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

export { router as DataArea }
