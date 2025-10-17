import type { GeneralCultivationModel } from '../../domain/models/general-cultivations-model'
import type { Filters, Sort } from '@/core/domain/types'

export type GeneralCultivationFilters = Filters<GeneralCultivationModel>
export type GeneralCultivationSort = Sort<GeneralCultivationModel>
