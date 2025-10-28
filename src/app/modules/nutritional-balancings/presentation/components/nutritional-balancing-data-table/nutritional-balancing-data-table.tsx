import { DataTable } from '@/core/presentation/components/ui'

import { useNutritionalBalancingDataTable } from './nutritional-balancing-data-table.hook'

import type { NutritionalBalancingModel } from '../../../domain/models/nutritional-balancings-model'

export function NutritionalBalancingDataTable() {
  const {
    columns,
    nutritionalBalancings,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useNutritionalBalancingDataTable()

  return (
    <DataTable<NutritionalBalancingModel>
      columns={columns}
      data={nutritionalBalancings.resources}
      totalPages={nutritionalBalancings.totalPages}
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

NutritionalBalancingDataTable.displayName = 'NutritionalBalancingDataTable'
