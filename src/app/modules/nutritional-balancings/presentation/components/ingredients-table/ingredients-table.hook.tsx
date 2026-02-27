import { useMemo } from 'react'

import { type ColumnDef } from '@tanstack/react-table'
import { PencilIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/core/presentation/components/ui'

import type { IngredientItemSchema } from '../../validations/nutritional-balancing-form-schema'
import type { Option } from '@/core/domain/types'

type UseIngredientsTableProps = {
  categoryType: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
  onRemove: (
    category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL',
    index: number
  ) => void
  onEdit: (
    category: 'FORAGE' | 'CONCENTRATE' | 'MINERAL',
    index: number
  ) => void
}

export function useIngredientsTable({
  categoryType,
  onRemove,
  onEdit,
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
        cell: ({ getValue }) => {
          const quantity = getValue<string>()

          return quantity || '-'
        },
      },
      {
        id: 'actions',
        header: '',
        meta: {
          align: 'right',
        },
        cell: ({ row }) => (
          <div className="flex gap-1 justify-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onEdit(categoryType, row.index)}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(categoryType, row.index)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [categoryType, onRemove, onEdit]
  )

  return {
    columns,
  }
}
