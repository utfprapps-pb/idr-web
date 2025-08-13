export type FilterType =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'LIKE'
  | 'NOT_LIKE'
  | 'GREATER'
  | 'LESS'
  | 'GREATER_EQUAL'
  | 'LESS_EQUALS'
  | 'IN'
  | 'NOT_IN'
  | 'IS_NULL'
  | 'IS_NOT_NULL'
  | 'BETWEEN'

export type FilterValue<T> = {
  value: T
  type: FilterType
}

export type Filters<TModel> = {
  [key in keyof TModel]?: FilterValue<TModel[key]>
}
