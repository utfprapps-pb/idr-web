import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalDeathDataTable } from './animal-death-data-table.hook'

import type { AnimalDeathModel } from '../../../domain/models/animal-deaths-model'

export function AnimalDeathDataTable() {
  const { columns, animalDeaths, isLoading, page, sort, setSort, setPage } =
    useAnimalDeathDataTable()

  return (
    <DataTable<AnimalDeathModel>
      columns={columns}
      data={animalDeaths.resources}
      totalPages={animalDeaths.totalPages}
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

AnimalDeathDataTable.displayName = 'AnimalDeathDataTable'
