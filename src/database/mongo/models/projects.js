import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const Projects = new Schema(
  {
    name: {
      required: true,
      type    : String,
      unique  : true
    },
    topic: {
      required: true,
      type    : String
    }
  },
  { collection: 'projects' }
)

Projects.plugin(uniqueValidator)

const ProjectsModel = mongoose.model('Projects', Projects)

export { ProjectsModel }
