export function paginateData<TData extends object>(
  pagination: {
    page: number
    perPage?: number
  },
  data: TData[]
) {
  const { page, perPage = 10 } = pagination

  const start = page * perPage
  const end = start + perPage

  return data.slice(start, end)
}
