import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalInseminationDataTable } from './animal-insemination-data-table.hook'

import type { AnimalInseminationModel } from '../../../domain/models/animal-inseminations-model'

export function AnimalInseminationDataTable() {
  const {
    columns,
    animalInseminations,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useAnimalInseminationDataTable()

  return (
    <DataTable<AnimalInseminationModel>
      columns={columns}
      data={animalInseminations.resources}
      totalPages={animalInseminations.totalPages}
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

AnimalInseminationDataTable.displayName = 'AnimalInseminationDataTable'
