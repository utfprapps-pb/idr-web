import { DataTable } from '@/core/presentation/components/ui'

import { useInputUseProductDataTable } from './input-use-product-data-table.hook'

export function InputUseProductDataTable() {
  const { columns, inputUseProducts, isLoading, page, sort, setPage, setSort } =
    useInputUseProductDataTable()

  return (
    <DataTable
      columns={columns}
      data={inputUseProducts.resources}
      totalPages={inputUseProducts.totalPages}
      loading={isLoading}
      pagination={{
        currentPage: page,
        onPageChange: setPage,
      }}
      sorting={{
        currentSorting: sort,
        onSorting: setSort,
      }}
    />
  )
}

InputUseProductDataTable.displayName = 'InputUseProductDataTable'
