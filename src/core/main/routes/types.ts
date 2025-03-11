import { ROUTES } from './routes'

import type { MergeUnionTypes } from '@/core/domain/types'

export type Route = keyof typeof ROUTES

type BooleanMap = Record<string, boolean>

type Tmp<O extends BooleanMap> = {
  [K in keyof O]: O[K] extends true
    ? { _: { [key in K]: string } }
    : { _: { [key in K]?: string } }
}

export type TransformRouteParams<O extends BooleanMap> = MergeUnionTypes<
  Tmp<O>[keyof O]['_']
>
