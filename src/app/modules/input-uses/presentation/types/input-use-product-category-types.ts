import type { InputUseProductCategoryModel } from '../../domain/models/input-use-product-categories-model'
import type { Filters, Sort } from '@/core/domain/types'

export type InputUseProductCategoryFilters =
  Filters<InputUseProductCategoryModel>
export type InputUseProductCategorySort = Sort<InputUseProductCategoryModel>
