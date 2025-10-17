import type { GeneralCultivationDiseaseModel } from '../../domain/models/general-cultivation-diseases-model'
import type { Filters, Sort } from '@/core/domain/types'

export type GeneralCultivationDiseaseFilters =
  Filters<GeneralCultivationDiseaseModel>
export type GeneralCultivationDiseaseSort = Sort<GeneralCultivationDiseaseModel>
