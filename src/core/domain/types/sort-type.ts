export type SortDirection = 'asc' | 'desc'

export type Sort<TModel> = {
  direction: SortDirection
  field: keyof TModel
}

export type ApiSort<TModel> = {
  type: SortDirection
  field: keyof TModel
}
