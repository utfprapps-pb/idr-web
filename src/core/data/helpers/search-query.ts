import { toLocalDate } from './local-date'

import type { Filters, ListParams } from '@/core/domain/types'

function hasValue(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return false
  if (Array.isArray(value)) return value.length > 0

  return true
}

/**
 * A rota `/search` aceita um único `terms`: usa o primeiro filtro preenchido.
 */
export function resolveTerms<TModel>(
  filters?: Filters<TModel>
): string | undefined {
  if (!filters) return undefined

  const filterEntry = (
    Object.values(filters) as ({ value: unknown } | undefined)[]
  ).find((filter) => filter !== undefined && hasValue(filter.value))

  if (!filterEntry) return undefined

  const { value } = filterEntry

  if (value instanceof Date) return toLocalDate(value)
  if (Array.isArray(value)) return value.map(String).join(',')

  return String(value)
}

/**
 * Monta a query string da rota `/search`. `sort`/`direction` só são enviados
 * quando há `sort` e `resolveSortField` devolve um campo.
 */
export function buildSearchQuery<TModel>(
  { pagination, filters, sort }: ListParams<TModel>,
  resolveSortField?: (field: string) => string | undefined
): string {
  const params = new URLSearchParams({
    page: String((pagination?.page ?? 1) - 1),
    perPage: String(pagination?.perPage ?? 10),
  })

  const terms = resolveTerms(filters)
  if (terms) params.set('terms', terms)

  if (sort && resolveSortField) {
    const sortField = resolveSortField(String(sort.field))

    if (sortField) {
      params.set('sort', sortField)
      params.set('direction', sort.direction)
    }
  }

  return params.toString()
}

export function toTotalPages(body: { total: number; perPage: number }): number {
  return body.perPage > 0 ? Math.ceil(body.total / body.perPage) : 0
}
