import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalMedicationDataTable } from './animal-medication-data-table.hook'

import type { AnimalMedicationModel } from '../../../domain/models/animal-medications-model'

export function AnimalMedicationDataTable() {
  const {
    columns,
    animalMedications,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useAnimalMedicationDataTable()

  return (
    <DataTable<AnimalMedicationModel>
      columns={columns}
      data={animalMedications.resources}
      totalPages={animalMedications.totalPages}
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

AnimalMedicationDataTable.displayName = 'AnimalMedicationDataTable'
