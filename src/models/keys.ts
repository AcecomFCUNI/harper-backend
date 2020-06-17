import { Document, model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface IKeys extends Document {
  createdAt: Date,
  delivered: boolean,
  key      : boolean
}

const Keys = new Schema(
  {
    createdAt: {
      default: Date.now,
      type   : Date,
      unique : true
    },
    delivered: {
      default: false,
      type   : Boolean
    },
    key: {
      type  : String,
      unique: true
    },
    purpose: {
      type   : String,
      default: 'dev'
    }
  }
)

Keys.plugin(uniqueValidator)

const KeysModel = model<IKeys>('keys', Keys)

export { IKeys, KeysModel }
