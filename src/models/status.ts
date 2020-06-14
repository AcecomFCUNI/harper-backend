import { Document, model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface IStatus extends Document {
  name: string
}

const Status = new Schema(
  {
    name: {
      required: true,
      type    : String,
      unique  : true
    }
  }
)

Status.plugin(uniqueValidator)

const StatusModel = model<IStatus>('status', Status)

export { IStatus, StatusModel }
