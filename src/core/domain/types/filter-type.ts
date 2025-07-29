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

export type FilterValue = {
  value: string
  type: FilterType
}

export type Filters<TModel> = {
  [key in keyof TModel]?: {
    value: TModel[key]
    type: FilterType
  }
}
