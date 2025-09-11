import { DataTable } from '@/core/presentation/components/ui'

import { useMachineDataTable } from './machine-data-table.hook'

import type { MachineModel } from '../../../domain/models/machines-model'

export function MachineDataTable() {
  const { columns, machines, isLoading, page, sort, setSort, setPage } =
    useMachineDataTable()

  return (
    <DataTable<MachineModel>
      columns={columns}
      data={machines.resources}
      totalPages={machines.totalPages}
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

MachineDataTable.displayName = 'MachineDataTable'
