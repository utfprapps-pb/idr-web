import { useMemo } from 'react'

import { type ColumnDef } from '@tanstack/react-table'
import { Trash2Icon } from 'lucide-react'

import { Button } from '@/core/presentation/components/ui'

import type { IngredientItemSchema } from '../../validations/nutritional-balancing-form-schema'
import type { Option } from '@/core/domain/types'

type UseIngredientsTableProps = {
  categoryType: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
  onRemove: (
    category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL',
    index: number
  ) => void
}

export function useIngredientsTable({
  categoryType,
  onRemove,
}: UseIngredientsTableProps) {
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
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(categoryType, row.index)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    [categoryType, onRemove]
  )

  return {
    columns,
  }
}
