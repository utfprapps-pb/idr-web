import { DataTable } from '@/core/presentation/components/ui'

import { useInputUseLocationDataTable } from './input-use-location-data-table.hook'

import type { InputUseLocationModel } from '../../../domain/models/input-use-locations-model'

export function InputUseLocationDataTable() {
  const {
    columns,
    inputUseLocations,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useInputUseLocationDataTable()

  return (
    <DataTable<InputUseLocationModel>
      columns={columns}
      data={inputUseLocations.resources}
      totalPages={inputUseLocations.totalPages}
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

InputUseLocationDataTable.displayName = 'InputUseLocationDataTable'
