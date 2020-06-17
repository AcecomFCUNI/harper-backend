import { Document, model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { IAreas } from './areas'
import { IMembers } from './members'

interface IProjects extends Document {
  area        : IAreas['_id']
  description : string
  name        : string
  participants: IMembers['_id'][]
  repo        : string[]
  topic       : string
}

const Projects = new Schema(
  {
    area: {
      ref     : 'areas',
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
      ref     : 'members',
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
  }
)

Projects.plugin(uniqueValidator)

const ProjectsModel = model<IProjects>('projects', Projects)

export { IProjects, ProjectsModel }
