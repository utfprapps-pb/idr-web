import { ROUTES } from './routes'

import type { MergeUnionTypes } from '@/core/domain/types'

export type Route = keyof typeof ROUTES

type BooleanMap = Record<string, boolean>

type Tmp<V, O extends BooleanMap> = {
  [K in keyof O]: O[K] extends true
    ? { _: { [key in K]: V } }
    : { _: { [key in K]?: V } }
}

export type TransformRouteParams<V, O extends BooleanMap> = MergeUnionTypes<
  Tmp<V, O>[keyof O]['_']
>
