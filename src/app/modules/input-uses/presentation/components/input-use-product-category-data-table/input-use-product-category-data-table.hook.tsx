import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useInputUseProductCategoryContext } from '../../hooks/input-use-product-category-context.hook'
import { useInputUseProductCategoriesQuery } from '../../hooks/queries/input-use-product-categories-query.hook'

import type { InputUseProductCategoryModel } from '../../../domain/models/input-use-product-categories-model'
import type { InputUseProductCategorySort } from '../../types/input-use-product-category-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useInputUseProductCategoryDataTable() {
  const {
    filters,
    openEditInputUseProductCategoryForm,
    openDeleteInputUseProductCategoryContainer,
  } = useInputUseProductCategoryContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<InputUseProductCategorySort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, inputUseProductCategories } =
    useInputUseProductCategoriesQuery({
      filters: debouncedFilters,
      page,
      sort,
    })

  const columns = useMemo<ColumnDef<InputUseProductCategoryModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: inputUseProductCategory } = row

          return (
            <DropdownMenu.Root key={inputUseProductCategory.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditInputUseProductCategoryForm(inputUseProductCategory)
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteInputUseProductCategoryContainer(
                      inputUseProductCategory
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
      openDeleteInputUseProductCategoryContainer,
      openEditInputUseProductCategoryForm,
    ]
  )

  return {
    columns,
    inputUseProductCategories,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
