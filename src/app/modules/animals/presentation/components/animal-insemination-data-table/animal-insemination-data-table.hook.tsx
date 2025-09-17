import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalInseminationContext } from '../../hooks/animal-insemination-context.hook'
import { useAnimalInseminationsQuery } from '../../hooks/queries/animal-inseminations-query.hook'

import type { AnimalInseminationModel } from '../../../domain/models/animal-inseminations-model'
import type { AnimalInseminationSort } from '../../types/animal-insemination-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalInseminationDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalInseminationForm,
    openDeleteAnimalInseminationContainer,
  } = useAnimalInseminationContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalInseminationSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animalInseminations } = useAnimalInseminationsQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalInseminationModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data',
      },
      {
        accessorKey: 'sire',
        header: 'Animal Reprodutor',
      },

      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalInsemination } = row

          return (
            <DropdownMenu.Root key={animalInsemination.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditAnimalInseminationForm(animalInsemination)
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalInseminationContainer(animalInsemination)
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
    [openDeleteAnimalInseminationContainer, openEditAnimalInseminationForm]
  )

  return {
    columns,
    animalInseminations,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
