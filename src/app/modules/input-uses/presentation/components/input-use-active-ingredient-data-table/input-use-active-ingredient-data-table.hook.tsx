import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useInputUseActiveIngredientContext } from '../../hooks/input-use-active-ingredient-context.hook'
import { useInputUseActiveIngredientsQuery } from '../../hooks/queries/input-use-active-ingredients-query.hook'

import type { InputUseActiveIngredientModel } from '../../../domain/models/input-use-active-ingredients-model'
import type { InputUseActiveIngredientSort } from '../../types/input-use-active-ingredient-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useInputUseActiveIngredientDataTable() {
  const {
    filters,
    openEditInputUseActiveIngredientForm,
    openDeleteInputUseActiveIngredientContainer,
  } = useInputUseActiveIngredientContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<InputUseActiveIngredientSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, inputUseActiveIngredients } =
    useInputUseActiveIngredientsQuery({
      filters: debouncedFilters,
      page,
      sort,
    })

  const columns = useMemo<ColumnDef<InputUseActiveIngredientModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: inputUseActiveIngredient } = row

          return (
            <DropdownMenu.Root key={inputUseActiveIngredient.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditInputUseActiveIngredientForm(
                      inputUseActiveIngredient
                    )
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteInputUseActiveIngredientContainer(
                      inputUseActiveIngredient
                    )
                  }
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [
      openDeleteInputUseActiveIngredientContainer,
      openEditInputUseActiveIngredientForm,
    ]
  )

  return {
    columns,
    inputUseActiveIngredients,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
