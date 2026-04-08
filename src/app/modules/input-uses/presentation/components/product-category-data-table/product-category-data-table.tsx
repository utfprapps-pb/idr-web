import { DataTable } from '@/core/presentation/components/ui'

import { useProductCategoryDataTable } from './product-category-data-table.hook'

import type { ProductCategoryModel } from '../../../domain/models/product-categories-model'

export function ProductCategoryDataTable() {
  const {
    columns,
    productCategories,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useProductCategoryDataTable()

  return (
    <DataTable<ProductCategoryModel>
      columns={columns}
      data={productCategories.resources}
      totalPages={productCategories.totalPages}
      pagination={{
        currentPage: page,
        onPageChange: setPage,
      }}
      sorting={{
        currentSorting: sort,
        onSorting: setSort,
      }}
      loading={isLoading}
    />
  )
}

ProductCategoryDataTable.displayName = 'ProductCategoryDataTable'
