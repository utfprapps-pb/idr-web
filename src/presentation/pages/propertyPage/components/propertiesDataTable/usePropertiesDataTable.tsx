import { useMemo, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { DropdownMenu } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import { useProperties } from '../../hooks/useProperties'
import { usePropertyContext } from '../../hooks/usePropertyContext'

import type { PropertyModel } from '@/domain/models/propertyModel'
import type {
  PropertyFilters,
  PropertySort,
} from '@/presentation/pages/propertyPage/types'

export const usePropertiesDataTable = () => {
  const { getProperties, openEditPropertyForm, openDeletePropertyContainer } =
    usePropertyContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<PropertySort>()
  const [filters, setFilters] = useState<PropertyFilters>({
    name: '',
  })
  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, properties } = useProperties({
    filters: debouncedFilters,
    getProperties,
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
                <MoreHorizontal />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => {
                    openEditPropertyForm(property)
                  }}
                >
                  <Pencil size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => {
                    openDeletePropertyContainer(property)
                  }}
                >
                  <Trash2 size={14} /> Excluir
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
