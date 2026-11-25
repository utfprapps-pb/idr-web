import type { Option } from '@/core/domain/types'

/** Item de `GET /products/search` (catálogo de produtos do backend). */
export type ProductApiResponse = {
  id: string
  name: string
  description: string | null
  activePrinciple: { id: string; name: string } | null
  category: { id: string; description: string } | null
}

/** Campos pesquisáveis do catálogo (o `terms` da rota `/search`). */
export type ProductModel = {
  id: string
  name: string
}

export type ProductOption = Option<string, { activePrinciple: string }>
