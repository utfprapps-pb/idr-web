import type { WithId } from '@/core/domain/types'

export type InputUseLocationDetailsModel = {
  description: string
}

export type InputUseLocationDetailsApiResponse = {
  description: string
}

export type InputUseLocationModel = WithId<{
  description: string
}>

export type InputUseLocationApiResponse = WithId<{
  description: string
}>
