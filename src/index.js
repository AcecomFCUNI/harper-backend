import restify from 'restify'
import { Router } from 'restify-router'
import { Home } from './routes/home'
import { Careers } from './routes/careers'
import { MemberStatus } from './routes/memberStatus'
import { DataArea } from './routes/dataArea'
import { DataMembers } from './routes/dataMembers'
import { Projects } from './routes/projects'

import { db } from './database/mongo/connection/index'

const PORT = process.env.PORT
const server = restify.createServer()
const router = new Router()

router.add('/', Home)
router.add('/api', Careers)
router.add('/api', MemberStatus)
router.add('/api', DataArea)
router.add('/api', DataMembers)
router.add('/api', Projects)
router.applyRoutes(server)

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
