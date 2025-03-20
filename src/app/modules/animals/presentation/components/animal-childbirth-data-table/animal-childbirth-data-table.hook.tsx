import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalChildbirthContext } from '../../hooks/animal-childbirth-context.hook'
import { useAnimalChildbirthsQuery } from '../../hooks/queries/animal-childbirths-query.hook'

import type { AnimalChildbirthModel } from '../../../domain/models/animal-childbirths-model'
import type { AnimalChildbirthSort } from '../../types/animal-childbirth-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalChildbirthDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalChildbirthForm,
    openDeleteAnimalChildbirthContainer,
  } = useAnimalChildbirthContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalChildbirthSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animalChildbirths } = useAnimalChildbirthsQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalChildbirthModel>[]>(
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
          const { original: animalChildbirth } = row

          return animalChildbirth.weight ? `${animalChildbirth.weight} kg` : '-'
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
          const { original: animalChildbirth } = row

          return (
            <DropdownMenu.Root key={animalChildbirth.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalChildbirthForm(animalChildbirth)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalChildbirthContainer(animalChildbirth)
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
    [openDeleteAnimalChildbirthContainer, openEditAnimalChildbirthForm]
  )

  return {
    columns,
    animalChildbirths,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
