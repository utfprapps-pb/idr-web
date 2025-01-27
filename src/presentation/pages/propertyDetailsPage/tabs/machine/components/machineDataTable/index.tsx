import React from 'react'

import { DataTable } from '@/presentation/components/ui'

import { useMachinesDataTable } from './useMachinesDataTable'

import type { MachineModel } from '@/domain/models/machineModel'

export const MachinesDataTable: React.FC = () => {
  const { columns, machines, isLoading, page, sort, setSort, setPage } =
    useMachinesDataTable()

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
