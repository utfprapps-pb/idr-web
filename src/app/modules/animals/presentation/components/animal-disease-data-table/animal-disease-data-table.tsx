import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalDiseaseDataTable } from './animal-disease-data-table.hook'

import type { AnimalDiseaseModel } from '../../../domain/models/animal-diseases-model'

export function AnimalDiseaseDataTable() {
  const { columns, animalDiseases, isLoading, page, sort, setSort, setPage } =
    useAnimalDiseaseDataTable()

  return (
    <DataTable<AnimalDiseaseModel>
      columns={columns}
      data={animalDiseases.resources}
      totalPages={animalDiseases.totalPages}
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

AnimalDiseaseDataTable.displayName = 'AnimalDiseaseDataTable'
