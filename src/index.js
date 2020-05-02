import restify from 'restify'
import { Router } from 'restify-router'
import { Home } from './routes/home'

const PORT = process.env.PORT
const server = restify.createServer()
const router = new Router()

router.add('/', Home)
router.applyRoutes(server)
server.use(restify.plugins.bodyParser())

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
