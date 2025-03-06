import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalDataTable } from './animal-data-table.hook'

import type { AnimalModel } from '../../../domain/models/animals-model'

export function AnimalDataTable() {
  const { columns, animals, isLoading, page, sort, setSort, setPage } =
    useAnimalDataTable()

  return (
    <DataTable<AnimalModel>
      columns={columns}
      data={animals.resources}
      totalPages={animals.totalPages}
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

AnimalDataTable.displayName = 'AnimalDataTable'
