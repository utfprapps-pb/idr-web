import type { WithId } from '../types'

// todo: quando for implementado a parte de registros globais de categorias de produtos (product-categories), mover esse model e tudo referente a product-categories para la
export type ProductCategoryModel = WithId<{
  description: string
}>

export type ProductCategoryApiResponse = WithId<{
  description: string
}>
