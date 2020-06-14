import { DtoArgs } from './args.dto'

export interface DtoStatus extends DtoArgs {
  data: {
    name: string
  }
}