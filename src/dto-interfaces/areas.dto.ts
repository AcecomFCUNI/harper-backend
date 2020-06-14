import { DtoArgs } from './args.dto'

export interface DtoAreas extends DtoArgs {
  data: {
    abstract?: string
    image   ?: string
    name     : string
    newName ?: string
  }
}