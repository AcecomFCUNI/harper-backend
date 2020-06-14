import { Application, Router } from 'express'

import { Home } from '../routes/home'
import { Areas } from '../routes/areas'
import { Careers } from '../routes/careers'
import { ContactUs } from '../routes/contactUs'
import { Members } from '../routes/members'
import { Projects } from '../routes/projects'
import { Status } from '../routes/status'

const routes = [
  Areas, Careers, ContactUs, Members, Projects, Status
]

const applyRoutes = (app: Application): void => {
  app.use('', Home)
  routes.forEach((route: Router) => {
    app.use('/api', route)
  })
}

export { applyRoutes }
