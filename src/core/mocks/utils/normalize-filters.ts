import { HttpRequest } from '@/core/data/protocols/http'

export function normalizeQueryFilters(url: URL) {
  const pagination = JSON.parse(
    url.searchParams.get('pagination') || '{}'
  ) as HttpRequest['pagination']

  const filters = JSON.parse(
    url.searchParams.get('filters') || '{}'
  ) as HttpRequest['filters']

  const sort = JSON.parse(
    url.searchParams.get('sort') || '{}'
  ) as HttpRequest['sort']

  return {
    pagination,
    filters,
    sort,
  }
}
