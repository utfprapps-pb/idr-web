import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useInputUseLocationContext } from '../../hooks/input-use-location-context.hook'
import { useInputUseLocationsQuery } from '../../hooks/queries/input-use-locations-query.hook'

import type { InputUseLocationModel } from '../../../domain/models/input-use-locations-model'
import type { InputUseLocationSort } from '../../types/input-use-location-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useInputUseLocationDataTable() {
  const {
    filters,
    openEditInputUseLocationForm,
    openDeleteInputUseLocationContainer,
  } = useInputUseLocationContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<InputUseLocationSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, inputUseLocations } = useInputUseLocationsQuery({
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<InputUseLocationModel>[]>(
    () => [
      {
        accessorKey: 'description',
        header: 'Descrição',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: inputUseLocation } = row

          return (
            <DropdownMenu.Root key={inputUseLocation.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditInputUseLocationForm(inputUseLocation)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteInputUseLocationContainer(inputUseLocation)
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
    [openDeleteInputUseLocationContainer, openEditInputUseLocationForm]
  )

  return {
    columns,
    inputUseLocations,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
