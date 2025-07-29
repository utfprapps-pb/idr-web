import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalChildbirthDataTable } from './animal-childbirth-data-table.hook'

import type { AnimalChildbirthModel } from '../../../domain/models/animal-childbirths-model'

export function AnimalChildbirthDataTable() {
  const {
    columns,
    animalChildbirths,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useAnimalChildbirthDataTable()

  return (
    <DataTable<AnimalChildbirthModel>
      columns={columns}
      data={animalChildbirths.resources}
      totalPages={animalChildbirths.totalPages}
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

AnimalChildbirthDataTable.displayName = 'AnimalChildbirthDataTable'
