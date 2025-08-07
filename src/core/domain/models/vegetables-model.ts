import type { WithId } from '../types'

export type VegetableModel = WithId<{
  name: string
}>

export type VegetableApiResponse = WithId<{
  cultureName: string
}>
