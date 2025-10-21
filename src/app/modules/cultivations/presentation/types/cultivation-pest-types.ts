import type { CultivationPestModel } from '../../domain/models/cultivation-pests-model'
import type { Filters, Sort } from '@/core/domain/types'

export type CultivationPestFilters = Filters<CultivationPestModel>
export type CultivationPestSort = Sort<CultivationPestModel>
