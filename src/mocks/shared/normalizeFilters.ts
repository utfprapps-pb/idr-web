import { HttpRequest } from '@/data/protocols/http'

export const normalizeQueryFilters = (url: URL) => {
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
