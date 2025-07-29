export type MockResponse<TData = unknown> = {
  content: TData
  numberOfElements: number
  pageable: {
    pageSize: number
  }
}
