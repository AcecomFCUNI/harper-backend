import { DtoArgs } from './args.dto'

export interface DtoCareers extends DtoArgs {
  data: {
    code?: string
    name?: string
  }
}