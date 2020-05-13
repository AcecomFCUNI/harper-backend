import { Home } from './home'
import { Careers } from './careers'
import { MemberStatus } from './memberStatus'
import { DataArea } from './dataArea'
import { DataMembers } from './dataMembers'
import { Projects } from './projects'
import { ContactUs } from './contactUs'

const routes = [
  Careers, ContactUs, DataArea, DataMembers, MemberStatus, Projects
]

const applyRoutes = (router, server) => {
  router.add('/', Home)
  routes.forEach(route => {
    router.add('/api', route)
  })
  router.applyRoutes(server)
}

export { applyRoutes }
