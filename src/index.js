import restify from 'restify'
import corsMiddleware from 'restify-cors-middleware2'
import { Router } from 'restify-router'

import { applyRoutes } from './routes/routes'
import { db } from './database/mongo/connection/index'
import { getKey } from './functions/getKey'

const PORT = process.env.PORT
const server = restify.createServer()
const router = new Router()
const cors = corsMiddleware({
  allowHeaders: [
    'Authorization',
    'Content-Type'
  ],
  origins: ['*']
})

applyRoutes(router, server)

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

server.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`)

  try {
    const result = await getKey()

    console.log(result)
  } catch (err) {
    console.log('Error at index.js')
    console.error(err)
  }
})

db.on('error', () => {
  console.log('There was an error while connecting to the database')
})

db.once('open', () => {
  console.log('We are connected to the database!')
})
