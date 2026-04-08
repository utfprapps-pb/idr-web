import type { WithId } from '@/core/domain/types'

export type InputUseProductCategoryDetailsModel = {
  name: string
}

export type InputUseProductCategoryDetailsApiResponse = {
  name: string
}

export type InputUseProductCategoryModel = WithId<{
  name: string
}>

export type InputUseProductCategoryApiResponse = WithId<{
  name: string
}>
