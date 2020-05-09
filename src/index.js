import restify from 'restify'
import corsMiddleware from 'restify-cors-middleware'

import { Router } from 'restify-router'
import { Home } from './routes/home'
import { Careers } from './routes/careers'
import { MemberStatus } from './routes/memberStatus'
import { DataArea } from './routes/dataArea'
import { DataMembers } from './routes/dataMembers'
import { Projects } from './routes/projects'
import { ContactUs } from './routes/contactUs'

import { db } from './database/mongo/connection/index'

const PORT = process.env.PORT
const server = restify.createServer()
const router = new Router()
const cors = corsMiddleware({ origins: ['*'] })

router.add('/', Home)
router.add('/api', Careers)
router.add('/api', MemberStatus)
router.add('/api', DataArea)
router.add('/api', DataMembers)
router.add('/api', Projects)
router.add('/api', ContactUs)
router.applyRoutes(server)

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

db.on('error', () => {
  console.log('There was an error while connecting to the database')
})

db.once('open', () => {
  console.log('We are connected to the database!')
})
