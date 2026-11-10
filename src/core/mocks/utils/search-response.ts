import { paginateData } from './paginate-data'
import { sortData } from './sort-data'

import type { SearchApiResponse } from '@/core/domain/types'

export type SearchRequestParams = {
  terms: string
  page: number
  perPage: number
  sort: string | null
  direction: string
}

export function parseSearchParams(request: Request): SearchRequestParams {
  const { searchParams } = new URL(request.url)

  return {
    terms: searchParams.get('terms') ?? '',
    page: Number(searchParams.get('page') ?? 0),
    perPage: Number(searchParams.get('perPage') ?? 10),
    sort: searchParams.get('sort'),
    direction: searchParams.get('direction') ?? 'asc',
  }
}

function defaultMatches(item: object, terms: string): boolean {
  return Object.values(item).some((value) =>
    String(value).toLowerCase().includes(terms.toLowerCase())
  )
}

export function toSearchResponse<TItem extends object>(
  items: TItem[],
  { terms, page, perPage, sort, direction }: SearchRequestParams,
  matches: (item: TItem, terms: string) => boolean = defaultMatches
): SearchApiResponse<TItem> {
  let result = items

  if (terms) {
    result = result.filter((item) => matches(item, terms))
  }

  if (sort) {
    result = sortData(
      {
        field: sort as keyof TItem,
        type: direction as 'asc' | 'desc',
      },
      result
    )
  }

  return {
    currentPage: page,
    perPage,
    total: result.length,
    items: paginateData({ page, perPage }, result),
  }
}
