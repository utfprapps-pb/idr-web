export function normalizeQueryFilters(url: URL) {
  const pagination = JSON.parse(url.searchParams.get('pagination') || '{}')

  const filters = JSON.parse(url.searchParams.get('filters') || '{}')

  const sort = JSON.parse(url.searchParams.get('sort') || '{}')

  return {
    pagination,
    filters,
    sort,
  }
}
