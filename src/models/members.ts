import { Document, model, Schema } from 'mongoose'

import { IAreas } from './areas'
import { ICareers } from './careers'
import { IStatus } from './status'

interface IMembers extends Document {
  area    : IAreas['_id']
  birthday: Date
  career  : ICareers['_id']
  code    : string
  email   : string[]
  git     : string
  key     : boolean
  lastName: string
  name    : string
  phone   : string[]
  photo   : string
  status  : IStatus['_id']
}

const Members = new Schema(
  {
    area: {
      ref     : 'areas',
      required: true,
      type    : Schema.Types.ObjectId
    },
    birthday: {
      required: true,
      type    : Date
    },
    career: {
      ref     : 'careers',
      required: true,
      type    : Schema.Types.ObjectId
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
      ref     : 'status',
      required: true,
      type    : Schema.Types.ObjectId
    }
  }
)

const MembersModel = model<IMembers>('Members', Members)

export { IMembers, MembersModel }
