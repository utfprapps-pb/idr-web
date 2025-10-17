import { DataTable } from '@/core/presentation/components/ui'

import { useCultivationDiseaseDataTable } from './cultivation-disease-data-table.hook'

import type { CultivationDiseaseModel } from '../../../domain/models/cultivation-diseases-model'

export function CultivationDiseaseDataTable() {
  const {
    columns,
    cultivationDiseases,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useCultivationDiseaseDataTable()

  return (
    <DataTable<CultivationDiseaseModel>
      columns={columns}
      data={cultivationDiseases.resources}
      totalPages={cultivationDiseases.totalPages}
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

CultivationDiseaseDataTable.displayName = 'CultivationDiseaseDataTable'
