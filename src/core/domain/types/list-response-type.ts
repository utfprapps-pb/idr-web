export type ListResponse<TData> = {
  resources: TData[]
  totalPages: number
}

export type ListApiResponse<TData> = {
  content: TData
  pageable: {
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
  }
  totalElements: number
  totalPages: number
  last: boolean
  size: number
  number: number
  first: boolean
  numberOfElements: number
  empty: boolean
}
