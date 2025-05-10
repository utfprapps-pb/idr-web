import type { NestedKeyOf } from './nested-keyof-types'

export type MapApiProperties<TModel, TApiModel> = Partial<{
  [key in keyof TModel]: NestedKeyOf<
    TApiModel extends object ? TApiModel : object
  >
}>
