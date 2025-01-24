import React from 'react'

import { DataTable } from '@/presentation/components/ui'

import { useImprovementsDataTable } from './useImprovementsDataTable'

import type { ImprovementModel } from '@/domain/models/improvementModel'

export const ImprovementsDataTable: React.FC = () => {
  const { columns, improvements, isLoading, page, sort, setSort, setPage } =
    useImprovementsDataTable()

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
