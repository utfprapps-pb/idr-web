import React from 'react'

import { DataTable } from '@/presentation/components/ui'

import { useAnimalsDataTable } from './useAnimalsDataTable'

import type { AnimalModel } from '@/domain/models/animalModel'

export const AnimalsDataTable: React.FC = () => {
  const { columns, animals, isLoading, page, sort, setSort, setPage } =
    useAnimalsDataTable()

  return (
    <DataTable<AnimalModel>
      columns={columns}
      data={animals.resources}
      totalPages={animals.totalPages}
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
