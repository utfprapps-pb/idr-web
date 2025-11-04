import { useMemo } from 'react'

import { type ColumnDef } from '@tanstack/react-table'

import type { IngredientItemSchema } from '../../validations/nutritional-balancing-form-schema'
import type { Option } from '@/core/domain/types'

export function useIngredientsTable() {
  const columns = useMemo<ColumnDef<IngredientItemSchema>[]>(
    () => [
      {
        accessorKey: 'ingredient',
        header: 'Ingrediente',
        meta: {
          align: 'left',
        },
        cell: ({ getValue }) => {
          const { label: ingredientName } = getValue<Option>()

          return ingredientName
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantidade',
        meta: {
          align: 'right',
        },
        cell: ({ getValue }) => getValue<string>(),
      },
    ],
    []
  )

  return {
    columns,
  }
}
