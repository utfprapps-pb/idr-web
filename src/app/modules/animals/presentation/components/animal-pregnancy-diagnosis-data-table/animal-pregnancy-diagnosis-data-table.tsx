import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalPregnancyDiagnosisDataTable } from './animal-pregnancy-diagnosis-data-table.hook'

import type { AnimalPregnancyDiagnosisModel } from '../../../domain/models/animal-pregnancy-diagnoses-model'

export function AnimalPregnancyDiagnosisDataTable() {
  const {
    columns,
    animalPregnancyDiagnoses,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useAnimalPregnancyDiagnosisDataTable()

  return (
    <DataTable<AnimalPregnancyDiagnosisModel>
      columns={columns}
      data={animalPregnancyDiagnoses.resources}
      totalPages={animalPregnancyDiagnoses.totalPages}
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

AnimalPregnancyDiagnosisDataTable.displayName =
  'AnimalPregnancyDiagnosisDataTable'
