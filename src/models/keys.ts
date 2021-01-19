import { Document, model, Schema } from 'mongoose'

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
      default: 'dev',
      type   : String
    }
  }
)

const KeysModel = model<IKeys>('keys', Keys)

export { IKeys, KeysModel }
