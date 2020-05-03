import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const ProjectMembers = new Schema(
  {
    idMember: [{
      ref : 'DataMembers',
      type: Schema.Types.ObjectId
    }],
    idProject: {
      ref     : 'Projects',
      required: true,
      type    : Schema.Types.ObjectId,
      unique  : true
    }
  },
  { collection: 'projectMembers' }
)

ProjectMembers.plugin(uniqueValidator)

const ProjectMembersModel = mongoose.model('Projects', ProjectMembers)

export { ProjectMembersModel }
