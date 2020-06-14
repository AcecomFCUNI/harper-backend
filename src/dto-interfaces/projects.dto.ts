import { DtoArgs } from './args.dto'

export interface DtoProjects extends DtoArgs {
  data: {
    area         ?: string
    description  ?: string
    name          : string
    newName      ?: string
    participants ?: string[]
    repo         ?: string[]
    topic        ?: string
  }
}
