import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalHeiferCalfStageContext } from '../../hooks/animal-heifer-calf-stage-context.hook'
import { useAnimalHeiferCalfStagesQuery } from '../../hooks/queries/animal-heifer-calf-stages-query.hook'

import type { AnimalHeiferCalfStageModel } from '../../../domain/models/animal-heifer-calf-stages-model'
import type { AnimalHeiferCalfStageSort } from '../../types/animal-heifer-calf-stage-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalHeiferCalfStageDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalHeiferCalfStageForm,
    openDeleteAnimalHeiferCalfStageContainer,
  } = useAnimalHeiferCalfStageContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalHeiferCalfStageSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animalHeiferCalfStages } = useAnimalHeiferCalfStagesQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalHeiferCalfStageModel>[]>(
    () => [
      {
        accessorKey: 'weighingDate',
        header: 'Data da pesagem',
        cell: ({ row }) => {
          const { original: animalHeiferCalf } = row

          return format(animalHeiferCalf.weighingDate, 'dd/MM/yyyy')
        },
      },
      {
        accessorKey: 'weight',
        header: 'Peso do Animal',
        cell: ({ row }) => {
          const { original: animalHeiferCalf } = row

          return animalHeiferCalf.weight ? `${animalHeiferCalf.weight} kg` : '-'
        },
      },
      {
        accessorKey: 'ecc',
        header: 'ECC',
      },
      {
        accessorKey: 'age',
        header: 'Idade',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalHeiferCalf } = row

          return (
            <DropdownMenu.Root key={animalHeiferCalf.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditAnimalHeiferCalfStageForm(animalHeiferCalf)
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalHeiferCalfStageContainer(animalHeiferCalf)
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
    [
      openDeleteAnimalHeiferCalfStageContainer,
      openEditAnimalHeiferCalfStageForm,
    ]
  )

  return {
    columns,
    animalHeiferCalfStages,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
