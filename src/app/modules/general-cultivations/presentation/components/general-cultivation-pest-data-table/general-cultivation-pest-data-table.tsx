import { DataTable } from '@/core/presentation/components/ui'

import { useGeneralCultivationPestDataTable } from './general-cultivation-pest-data-table.hook'

import type { GeneralCultivationPestModel } from '../../../domain/models/general-cultivation-pests-model'

export function GeneralCultivationPestDataTable() {
  const {
    columns,
    generalCultivationPests,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useGeneralCultivationPestDataTable()

  return (
    <DataTable<GeneralCultivationPestModel>
      columns={columns}
      data={generalCultivationPests.resources}
      totalPages={generalCultivationPests.totalPages}
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

GeneralCultivationPestDataTable.displayName = 'GeneralCultivationPestDataTable'
