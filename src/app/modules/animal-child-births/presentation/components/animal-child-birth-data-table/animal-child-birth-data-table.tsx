import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalChildBirthDataTable } from './animal-child-birth-data-table.hook'

import type { AnimalChildBirthModel } from '../../../domain/models/animal-child-births-model'

export function AnimalChildBirthDataTable() {
  const {
    columns,
    animalChildBirths,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useAnimalChildBirthDataTable()

  return (
    <DataTable<AnimalChildBirthModel>
      columns={columns}
      data={animalChildBirths.resources}
      totalPages={animalChildBirths.totalPages}
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

AnimalChildBirthDataTable.displayName = 'AnimalChildBirthDataTable'
