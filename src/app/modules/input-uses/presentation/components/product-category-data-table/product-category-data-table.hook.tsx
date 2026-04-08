import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useProductCategoryContext } from '../../hooks/product-category-context.hook'
import { useProductCategoriesQuery } from '../../hooks/queries/product-categories-query.hook'

import type { ProductCategoryModel } from '../../../domain/models/product-categories-model'
import type { ProductCategorySort } from '../../types/product-category-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useProductCategoryDataTable() {
  const {
    filters,
    openEditProductCategoryForm,
    openDeleteProductCategoryContainer,
  } = useProductCategoryContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<ProductCategorySort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, productCategories } = useProductCategoriesQuery({
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<ProductCategoryModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: productCategory } = row

          return (
            <DropdownMenu.Root key={productCategory.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditProductCategoryForm(productCategory)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteProductCategoryContainer(productCategory)
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
    [openDeleteProductCategoryContainer, openEditProductCategoryForm]
  )

  return {
    columns,
    productCategories,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
