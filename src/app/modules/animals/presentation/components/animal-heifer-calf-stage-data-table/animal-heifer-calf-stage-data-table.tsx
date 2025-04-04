import { DataTable } from '@/core/presentation/components/ui'

import { useAnimalHeiferCalfStageDataTable } from './animal-heifer-calf-stage-data-table.hook'

import type { AnimalHeiferCalfStageModel } from '../../../domain/models/animal-heifer-calf-stages-model'

export function AnimalHeiferCalfStageDataTable() {
  const {
    columns,
    animalHeiferCalfStages,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useAnimalHeiferCalfStageDataTable()

  return (
    <DataTable<AnimalHeiferCalfStageModel>
      columns={columns}
      data={animalHeiferCalfStages.resources}
      totalPages={animalHeiferCalfStages.totalPages}
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

AnimalHeiferCalfStageDataTable.displayName = 'AnimalHeiferCalfStageDataTable'
