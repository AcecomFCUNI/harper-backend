import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const DataMembers = new Schema(
  {
    area: {
      ref     : 'DataArea',
      required: true,
      type    : Schema.Types.ObjectId
    },
    birthday: {
      required: true,
      type    : Date
    },
    career: {
      ref : 'Careers',
      type: Schema.Types.ObjectId
    },
    code: {
      maxlength: 9,
      minlength: 9,
      required : true,
      type     : String,
      unique   : true
    },
    email: [{
      required: true,
      type    : String,
      unique  : true
    }],
    git     : String,
    key     : Boolean,
    lastName: {
      required: true,
      type    : String
    },
    name: {
      required: true,
      type    : String
    },
    phone: [{
      type  : String,
      unique: true
    }],
    photo: {
      default: '',
      type   : String
    },
    status: {
      ref : 'MemberStatus',
      type: Schema.Types.ObjectId
    }
  },
  { collection: 'dataMembers' }
)

DataMembers.plugin(uniqueValidator)

const DataMembersModel = mongoose.model('DataMembers', DataMembers)

export { DataMembersModel }
