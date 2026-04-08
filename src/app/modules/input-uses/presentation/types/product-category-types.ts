import type { ProductCategoryModel } from '../../domain/models/product-categories-model'
import type { Filters, Sort } from '@/core/domain/types'

export type ProductCategoryFilters = Filters<ProductCategoryModel>
export type ProductCategorySort = Sort<ProductCategoryModel>
