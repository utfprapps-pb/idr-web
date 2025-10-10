import type { WithId } from '../types'

// todo: quando for implementado a parte de registros globais de princípios ativos (active-ingredients), mover esse model e tudo referente a active-ingredients para la
export type ActiveIngredientModel = WithId<{
  name: string
}>

export type ActiveIngredientApiResponse = WithId<{
  name: string
}>
