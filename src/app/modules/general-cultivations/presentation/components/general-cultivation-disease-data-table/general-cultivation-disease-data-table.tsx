import { DataTable } from '@/core/presentation/components/ui'

import { useGeneralCultivationDiseaseDataTable } from './general-cultivation-disease-data-table.hook'

import type { GeneralCultivationDiseaseModel } from '../../../domain/models/general-cultivation-diseases-model'

export function GeneralCultivationDiseaseDataTable() {
  const {
    columns,
    generalCultivationDiseases,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useGeneralCultivationDiseaseDataTable()

  return (
    <DataTable<GeneralCultivationDiseaseModel>
      columns={columns}
      data={generalCultivationDiseases.resources}
      totalPages={generalCultivationDiseases.totalPages}
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

GeneralCultivationDiseaseDataTable.displayName =
  'GeneralCultivationDiseaseDataTable'
