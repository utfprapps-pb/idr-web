import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalMastitisContext } from '../../hooks/animal-mastitis-context.hook'
import { useAnimalMastitidesQuery } from '../../hooks/queries/animal-mastitides-query.hook'

import type { AnimalMastitisModel } from '../../../domain/models/animal-mastitides-model'
import type { AnimalMastitisSort } from '../../types/animal-mastitis-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalMastitisDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalMastitisForm,
    openDeleteAnimalMastitisContainer,
  } = useAnimalMastitisContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalMastitisSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, animalMastitides } = useAnimalMastitidesQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalMastitisModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data do Diagnóstico',
        cell: ({ row }) => {
          const { original: animalMastitis } = row

          return format(animalMastitis.date, 'dd/MM/yyyy')
        },
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
      },
      {
        accessorKey: 'ad',
        header: 'AD',
      },
      {
        accessorKey: 'ae',
        header: 'AE',
      },
      {
        accessorKey: 'pd',
        header: 'PD',
      },
      {
        accessorKey: 'pe',
        header: 'PE',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalMastitis } = row

          return (
            <DropdownMenu.Root key={animalMastitis.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalMastitisForm(animalMastitis)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalMastitisContainer(animalMastitis)
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
    [openDeleteAnimalMastitisContainer, openEditAnimalMastitisForm]
  )

  return {
    columns,
    animalMastitides,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
