import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalContext } from '../../hooks/animal-context.hook'
import { useAnimalsQuery } from '../../hooks/queries'

import type { AnimalModel } from '../../../domain/models/animals-model'
import type { AnimalSort } from '../../types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalDataTable() {
  const { propertyId, filters, openEditAnimalForm, openDeleteAnimalContainer } =
    useAnimalContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animals } = useAnimalsQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Identificação do Animal',
      },
      {
        accessorKey: 'breed',
        header: 'Tipo de Raça',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animal } = row

          return (
            <DropdownMenu.Root key={animal.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalForm(animal)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteAnimalContainer(animal)}
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [openDeleteAnimalContainer, openEditAnimalForm]
  )

  return {
    columns,
    animals,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
