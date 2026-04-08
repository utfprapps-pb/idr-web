import { DataTable } from '@/core/presentation/components/ui'

import { useInputUseProductCategoryDataTable } from './input-use-product-category-data-table.hook'

import type { InputUseProductCategoryModel } from '../../../domain/models/input-use-product-categories-model'

export function InputUseProductCategoryDataTable() {
  const {
    columns,
    inputUseProductCategories,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useInputUseProductCategoryDataTable()

  return (
    <DataTable<InputUseProductCategoryModel>
      columns={columns}
      data={inputUseProductCategories.resources}
      totalPages={inputUseProductCategories.totalPages}
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

InputUseProductCategoryDataTable.displayName =
  'InputUseProductCategoryDataTable'
