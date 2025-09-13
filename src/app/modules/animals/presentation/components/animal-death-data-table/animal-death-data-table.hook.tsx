import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalDeathContext } from '../../hooks/animal-death-context.hook'
import { useAnimalDeathsQuery } from '../../hooks/queries/animal-deaths-query.hook'

import type { AnimalDeathModel } from '../../../domain/models/animal-deaths-model'
import type { AnimalDeathSort } from '../../types/animal-death-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalDeathDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalDeathForm,
    openDeleteAnimalDeathContainer,
  } = useAnimalDeathContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalDeathSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animalDeaths } = useAnimalDeathsQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalDeathModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data do Óbito',
        cell: ({ row }) => {
          const { original: animalDeath } = row

          return animalDeath.date
            ? format(new Date(animalDeath.date), 'dd/MM/yyyy')
            : '-'
        },
      },
      {
        accessorKey: 'reason',
        header: 'Causa do Óbito',
      },

      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalDeath } = row

          return (
            <DropdownMenu.Root key={animalDeath.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalDeathForm(animalDeath)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteAnimalDeathContainer(animalDeath)}
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [openDeleteAnimalDeathContainer, openEditAnimalDeathForm]
  )

  return {
    columns,
    animalDeaths,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
