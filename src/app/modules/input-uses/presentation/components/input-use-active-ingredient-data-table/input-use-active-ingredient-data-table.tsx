import { DataTable } from '@/core/presentation/components/ui'

import { useInputUseActiveIngredientDataTable } from './input-use-active-ingredient-data-table.hook'

import type { InputUseActiveIngredientModel } from '../../../domain/models/input-use-active-ingredients-model'

export function InputUseActiveIngredientDataTable() {
  const {
    columns,
    inputUseActiveIngredients,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  } = useInputUseActiveIngredientDataTable()

  return (
    <DataTable<InputUseActiveIngredientModel>
      columns={columns}
      data={inputUseActiveIngredients.resources}
      totalPages={inputUseActiveIngredients.totalPages}
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

InputUseActiveIngredientDataTable.displayName =
  'InputUseActiveIngredientDataTable'
