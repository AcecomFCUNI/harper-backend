import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const MemberStatus = new Schema(
  {
    name: {
      required: true,
      type    : String,
      unique  : true
    }
  },
  { collection: 'memberStatus' }
)

MemberStatus.plugin(uniqueValidator)

const MemberStatusModel = mongoose.model('MemberStatus', MemberStatus)

export { MemberStatusModel }
