import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const Projects = new Schema(
  {
    area: {
      ref     : 'DataArea',
      required: true,
      type    : Schema.Types.ObjectId
    },
    description: {
      required: true,
      type    : String
    },
    name: {
      required: true,
      type    : String,
      unique  : true
    },
    participants: [{
      ref     : 'DataMembers',
      required: true,
      type    : Schema.Types.ObjectId
    }],
    repo: [{
      default: '',
      type   : String
    }],
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
