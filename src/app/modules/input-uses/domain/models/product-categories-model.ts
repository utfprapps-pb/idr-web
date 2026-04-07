import type { WithId } from '@/core/domain/types'

export type ProductCategoryDetailsModel = {
  name: string
}

export type ProductCategoryDetailsApiResponse = {
  name: string
}

export type ProductCategoryModel = WithId<{
  name: string
}>

export type ProductCategoryApiResponse = WithId<{
  name: string
}>
