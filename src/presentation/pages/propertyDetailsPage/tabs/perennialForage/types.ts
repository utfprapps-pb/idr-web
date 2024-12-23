import type { PerennialForageModel } from '@/domain/models/perennialForageModel'
import type { Filters, Sort } from '@/domain/shared/types'

export type PerennialForageFilters = Partial<
  Filters<keyof PerennialForageModel>
>

export type PerennialForageSort = Sort<keyof PerennialForageModel>
