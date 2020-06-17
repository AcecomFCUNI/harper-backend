import { DtoArgs } from './args.dto'

export interface DtoMembers extends DtoArgs {
  data: {
    area    ?: string
    birthday?: string
    career  ?: string
    code     : string
    email   ?: string[]
    git     ?: string
    key     ?: boolean
    lastName?: string
    name    ?: string
    newCode ?: string
    phone   ?: string[]
    photo   ?: string
    status  ?: string
  }
}