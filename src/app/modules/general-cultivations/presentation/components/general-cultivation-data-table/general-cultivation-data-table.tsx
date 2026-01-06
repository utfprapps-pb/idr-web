import { DataTable } from '@/core/presentation/components/ui'

import { useGeneralCultivationDataTable } from './general-cultivation-data-table.hook'

import type { GeneralCultivationModel } from '../../../domain/models/general-cultivations-model'

export function GeneralCultivationDataTable() {
  const {
    columns,
    generalCultivations,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useGeneralCultivationDataTable()

  return (
    <DataTable<GeneralCultivationModel>
      columns={columns}
      data={generalCultivations.resources}
      totalPages={generalCultivations.totalPages}
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

GeneralCultivationDataTable.displayName = 'GeneralCultivationDataTable'
