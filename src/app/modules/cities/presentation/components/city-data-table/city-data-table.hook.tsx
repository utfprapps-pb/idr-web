import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useCityContext } from '../../hooks/city-context.hook'
import { useCitiesQuery } from '../../hooks/queries/use-cities-query.hook'

import type { CityModel } from '../../../domain/models/cities-model'
import type { ColumnDef } from '@tanstack/react-table'

export function useCityDataTable() {
  const { openEditCityForm, openDeleteCityContainer } = useCityContext()

  const [page, setPage] = useState(1)
  const [terms, setTerms] = useState('')
  const debouncedTerms = useDebounce({ value: terms })

  const { isLoading, cities } = useCitiesQuery({
    terms: debouncedTerms,
    page,
  })

  const columns = useMemo<ColumnDef<CityModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'state',
        header: 'Estado',
      },
      {
        accessorKey: 'regionName',
        header: 'Região',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: city } = row

          return (
            <DropdownMenu.Root key={city.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openEditCityForm(city)
                  }}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openDeleteCityContainer(city)
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
    [openDeleteCityContainer, openEditCityForm]
  )

  return {
    columns,
    cities,
    isLoading,
    terms,
    page,
    setTerms,
    setPage,
  }
}
