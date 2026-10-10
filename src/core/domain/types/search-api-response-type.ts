export type SearchApiResponse<TItem> = {
  currentPage: number
  perPage: number
  total: number
  items: TItem[]
}
