import { Document, model, Schema } from 'mongoose'

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

const StatusModel = model<IStatus>('status', Status)

export { IStatus, StatusModel }
