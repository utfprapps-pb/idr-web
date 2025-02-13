import { useMemo, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { DropdownMenu } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import { useAnimalContext } from '../../hooks/useAnimalContext'
import { useAnimals } from '../../hooks/useAnimals'

import type { AnimalSort } from '../../types'
import type { AnimalModel } from '@/domain/models/animalModel'

export const useAnimalsDataTable = () => {
  const { propertyId, filters, openEditAnimalForm, openDeleteAnimalContainer } =
    useAnimalContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animals } = useAnimals({
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
                <MoreHorizontal />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalForm(animal)}
                >
                  <Pencil size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteAnimalContainer(animal)}
                >
                  <Trash2 size={14} /> Excluir
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
