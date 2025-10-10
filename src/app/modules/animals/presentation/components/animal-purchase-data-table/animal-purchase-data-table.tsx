import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalPurchaseDataTable } from './animal-purchase-data-table.hook'

import type { AnimalPurchaseModel } from '../../../domain/models/animal-purchases-model'

export function AnimalPurchaseDataTable() {
  const { columns, animalPurchases, isLoading, page, sort, setSort, setPage } =
    useAnimalPurchaseDataTable()

  return (
    <DataTable<AnimalPurchaseModel>
      columns={columns}
      data={animalPurchases.resources}
      totalPages={animalPurchases.totalPages}
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

AnimalPurchaseDataTable.displayName = 'AnimalPurchaseDataTable'
