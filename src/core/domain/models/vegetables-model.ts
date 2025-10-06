import type { WithId } from '../types'

// todo: quando for implementado a parte de registros globais de cultura(vegetable), mover esse model e tudo referente a vegetable para la
export type VegetableModel = WithId<{
  name: string
}>

export type VegetableApiResponse = WithId<{
  cultureName: string
}>
