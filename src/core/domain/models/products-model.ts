import type { Option, WithId } from '../types'

// todo: quando for implementado a parte de registros globais de produtos(products), mover esse model e tudo referente a products para la
export type ProductModel = WithId<{
  name: string
  description: string
  category: Option
  activeIngredient: Option
}>

export type ProductApiResponse = WithId<{
  name: string
  description: string
  category: Option
  activeIngredient: Option
}>
