import type { CultivationDiseaseModel } from '../../domain/models/cultivation-diseases-model'
import type { Filters, Sort } from '@/core/domain/types'

export type CultivationDiseaseFilters = Filters<CultivationDiseaseModel>
export type CultivationDiseaseSort = Sort<CultivationDiseaseModel>
