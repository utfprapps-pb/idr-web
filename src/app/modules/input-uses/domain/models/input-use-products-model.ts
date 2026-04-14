import type { Option, WithId } from '@/core/domain/types'

export type InputUseProductDetailsModel = {
  name: string
  category: Option
}

export type InputUseProductDetailsApiResponse = {
  name: string
  category: Option
}

export type InputUseProductModel = WithId<{
  name: string
  category: string
}>

export type InputUseProductApiResponse = WithId<{
  name: string
  category: string
}>
