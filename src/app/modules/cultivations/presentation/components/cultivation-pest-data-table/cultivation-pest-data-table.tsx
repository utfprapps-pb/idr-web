import { DataTable } from '@/core/presentation/components/ui'

import { useCultivationPestDataTable } from './cultivation-pest-data-table.hook'

import type { CultivationPestModel } from '../../../domain/models/cultivation-pests-model'

export function CultivationPestDataTable() {
  const { columns, cultivationPests, isLoading, page, sort, setSort, setPage } =
    useCultivationPestDataTable()

  return (
    <DataTable<CultivationPestModel>
      columns={columns}
      data={cultivationPests.resources}
      totalPages={cultivationPests.totalPages}
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

CultivationPestDataTable.displayName = 'CultivationPestDataTable'
