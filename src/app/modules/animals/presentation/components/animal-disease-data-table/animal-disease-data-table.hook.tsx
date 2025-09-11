import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalDiseaseContext } from '../../hooks/animal-disease-context.hook'
import { useAnimalDiseasesQuery } from '../../hooks/queries/animal-diseases-query.hook'

import type { AnimalDiseaseModel } from '../../../domain/models/animal-diseases-model'
import type { AnimalDiseaseSort } from '../../types/animal-disease-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalDiseaseDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalDiseaseForm,
    openDeleteAnimalDiseaseContainer,
  } = useAnimalDiseaseContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalDiseaseSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animalDiseases } = useAnimalDiseasesQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalDiseaseModel>[]>(
    () => [
      {
        accessorKey: 'diagnosticDate',
        header: 'Data do diagnóstico',
        cell: ({ row }) => {
          const { original: animalDisease } = row

          return animalDisease.diagnosticDate
            ? format(new Date(animalDisease.diagnosticDate), 'dd/MM/yyyy')
            : '-'
        },
      },
      {
        accessorKey: 'diagnostic',
        header: 'Diagnóstico',
      },

      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalDisease } = row

          return (
            <DropdownMenu.Root key={animalDisease.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalDiseaseForm(animalDisease)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalDiseaseContainer(animalDisease)
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
    [openDeleteAnimalDiseaseContainer, openEditAnimalDiseaseForm]
  )

  return {
    columns,
    animalDiseases,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
