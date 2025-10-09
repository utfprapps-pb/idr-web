import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalMastitisDataTable } from './animal-mastitis-data-table.hook'

import type { AnimalMastitisModel } from '../../../domain/models/animal-mastitides-model'

export function AnimalMastitisDataTable() {
  const { columns, animalMastitides, isLoading, page, sort, setSort, setPage } =
    useAnimalMastitisDataTable()

  return (
    <DataTable<AnimalMastitisModel>
      columns={columns}
      data={animalMastitides.resources}
      totalPages={animalMastitides.totalPages}
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

AnimalMastitisDataTable.displayName = 'AnimalMastitisDataTable'
