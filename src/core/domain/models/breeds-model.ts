import type { WithId } from '../types'

export type BreedModel = WithId<{
  name: string
}>

export type BreedApiResponse = WithId<{
  breedName: string
}>
