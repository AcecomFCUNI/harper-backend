import { DtoArgs } from './args.dto'

export interface DtoMail extends DtoArgs {
  data: {
    lastName: string
    mail    : string
    message : string
    name    : string
    subject : string
  }
}
