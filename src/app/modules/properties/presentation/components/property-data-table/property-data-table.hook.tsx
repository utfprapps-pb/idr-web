import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { usePropertyContext } from '../../hooks/property-context.hook'
import { usePropertiesQuery } from '../../hooks/queries/properties-query.hook'

import type { PropertyModel } from '../../../domain/models/properties-model'
import type { PropertyFilters, PropertySort } from '../../types'
import type { ColumnDef } from '@tanstack/react-table'

export function usePropertyDataTable() {
  const { openEditPropertyForm, openDeletePropertyContainer } =
    usePropertyContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<PropertySort>()
  const [filters, setFilters] = useState<PropertyFilters>({
    name: '',
  })
  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, properties } = usePropertiesQuery({
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<PropertyModel>[]>(
    () => [
      {
        accessorKey: 'producer',
        header: 'Produtor',
      },
      {
        accessorKey: 'name',
        header: 'Propriedade',
      },
      {
        accessorKey: 'county',
        header: 'Município',
        accessorFn: ({ county }) => `${county.city} - ${county.state}`,
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: property } = row

          return (
            <DropdownMenu.Root key={property.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openEditPropertyForm(property)
                  }}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openDeletePropertyContainer(property)
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
    [openDeletePropertyContainer, openEditPropertyForm]
  )

  return {
    columns,
    properties,
    isLoading,
    filters,
    page,
    sort,
    setFilters,
    setSort,
    setPage,
  }
}
