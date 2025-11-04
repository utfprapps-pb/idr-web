import { useMemo } from 'react'

import { type ColumnDef } from '@tanstack/react-table'

import { formatNumber } from '@/core/masker'

import type { IngredientItemSchema } from '../../validations/nutritional-balancing-form-schema'

export function useIngredientsTable() {
  const columns = useMemo<ColumnDef<IngredientItemSchema>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Ingrediente',
        meta: {
          align: 'left',
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantidade',
        meta: {
          align: 'right',
        },
        cell: ({ getValue }) =>
          formatNumber(getValue<number>(), {
            suffix: ' kg',
          }),
      },
    ],
    []
  )

  return {
    columns,
  }
}
