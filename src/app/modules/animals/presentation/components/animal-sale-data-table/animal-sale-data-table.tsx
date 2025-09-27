import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalSaleDataTable } from './animal-sale-data-table.hook'

import type { AnimalSaleModel } from '../../../domain/models/animal-sales-model'

export function AnimalSaleDataTable() {
  const { columns, animalSales, isLoading, page, sort, setSort, setPage } =
    useAnimalSaleDataTable()

  return (
    <DataTable<AnimalSaleModel>
      columns={columns}
      data={animalSales.resources}
      totalPages={animalSales.totalPages}
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

AnimalSaleDataTable.displayName = 'AnimalSaleDataTable'
