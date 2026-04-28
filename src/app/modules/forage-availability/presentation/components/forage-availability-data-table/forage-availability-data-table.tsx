import { DataTable } from '@/core/presentation/components/ui'

import { type ForageAvailabilityModel } from '../../../domain/models/forage-availability-model'

import { useForageAvailabilityDataTable } from './forage-availability-data-table.hook'

export function ForageAvailabilityDataTable() {
  const {
    columns,
    forageAvailabilities,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useForageAvailabilityDataTable()

  return (
    <DataTable<ForageAvailabilityModel>
      columns={columns}
      data={forageAvailabilities.resources}
      totalPages={forageAvailabilities.totalPages}
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

ForageAvailabilityDataTable.displayName = 'ForageAvailabilityDataTable'
