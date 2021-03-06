import { Document, model, Schema } from 'mongoose'

interface IAreas extends Document {
  abstract: string,
  code    : number,
  image   : string,
  name    : string
}

const Areas = new Schema(
  {
    abstract: {
      required: true,
      type    : String
    },
    code: {
      default: 1,
      type   : Number
    },
    image: {
      default: '',
      type   : String
    },
    name: {
      required: true,
      type    : String,
      unique  : true
    }
  }
)

const AreasModel = model<IAreas>('areas', Areas)

export { AreasModel, IAreas }
