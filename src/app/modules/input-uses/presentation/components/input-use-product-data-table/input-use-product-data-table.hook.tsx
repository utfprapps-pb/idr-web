import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useInputUseProductContext } from '../../hooks/input-use-product-context.hook'
import { useInputUseProductsQuery } from '../../hooks/queries/input-use-products-query.hook'

import type { InputUseProductModel } from '../../../domain/models/input-use-products-model'
import type { InputUseProductSort } from '../../types/input-use-product-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useInputUseProductDataTable() {
  const {
    filters,
    openEditInputUseProductForm,
    openDeleteInputUseProductContainer,
  } = useInputUseProductContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<InputUseProductSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, inputUseProducts } = useInputUseProductsQuery({
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<InputUseProductModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Produto',
      },
      {
        accessorKey: 'category',
        header: 'Categoria',
      },
      {
        accessorKey: 'activeIngredient',
        header: 'Princípio Ativo',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: inputUseProduct } = row

          return (
            <DropdownMenu.Root key={inputUseProduct.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openEditInputUseProductForm(inputUseProduct)
                  }}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openDeleteInputUseProductContainer(inputUseProduct)
                  }}
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [openDeleteInputUseProductContainer, openEditInputUseProductForm]
  )

  return {
    columns,
    inputUseProducts,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
