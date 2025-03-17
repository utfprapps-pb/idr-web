import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalChildBirthContext } from '../../hooks/animal-child-birth-context.hook'
import { useAnimalChildBirthsQuery } from '../../hooks/queries/animal-child-births-query.hook'

import type { AnimalChildBirthModel } from '../../../domain/models/animal-child-births-model'
import type { AnimalChildBirthSort } from '../../types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalChildBirthDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalChildBirthForm,
    openDeleteAnimalChildBirthContainer,
  } = useAnimalChildBirthContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalChildBirthSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animalChildBirths } = useAnimalChildBirthsQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalChildBirthModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data do parto',
      },
      {
        accessorKey: 'gender',
        header: 'Sexo',
      },
      {
        accessorKey: 'weight',
        header: 'Peso',
        cell: ({ row }) => {
          const { original: animalChildBirth } = row

          return animalChildBirth.weight ? `${animalChildBirth.weight} kg` : '-'
        },
      },
      {
        accessorKey: 'condition',
        header: 'Condição',
      },
      {
        accessorKey: 'breed',
        header: 'Raça',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalChildBirth } = row

          return (
            <DropdownMenu.Root key={animalChildBirth.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalChildBirthForm(animalChildBirth)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalChildBirthContainer(animalChildBirth)
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
    [openDeleteAnimalChildBirthContainer, openEditAnimalChildBirthForm]
  )

  return {
    columns,
    animalChildBirths,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
