import type { WithId } from '@/core/domain/types'

export type InputUseActiveIngredientDetailsModel = {
  name: string
}

export type InputUseActiveIngredientDetailsApiResponse = {
  name: string
}

export type InputUseActiveIngredientModel = WithId<{
  name: string
}>

export type InputUseActiveIngredientApiResponse = WithId<{
  name: string
}>
