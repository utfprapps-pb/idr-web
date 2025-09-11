import { DataTable } from '@/core/presentation/components/ui'

import { useImprovementDataTable } from './improvement-data-table.hook'

import type { ImprovementModel } from '../../../domain/models/improvements-model'

export function ImprovementDataTable() {
  const { columns, improvements, isLoading, page, sort, setSort, setPage } =
    useImprovementDataTable()

  return (
    <DataTable<ImprovementModel>
      columns={columns}
      data={improvements.resources}
      totalPages={improvements.totalPages}
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

ImprovementDataTable.displayName = 'ImprovementDataTable'
