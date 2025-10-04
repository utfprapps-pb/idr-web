import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalMedicationContext } from '../../hooks/animal-medication-context.hook'
import { useAnimalMedicationsQuery } from '../../hooks/queries/animal-medications-query.hook'

import type { AnimalMedicationModel } from '../../../domain/models/animal-medications-model'
import type { AnimalMedicationSort } from '../../types/animal-medication-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalMedicationDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalMedicationForm,
    openDeleteAnimalMedicationContainer,
  } = useAnimalMedicationContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalMedicationSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, animalMedications } = useAnimalMedicationsQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalMedicationModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data da Aplicação',
      },
      {
        accessorKey: 'activeIngredient',
        header: 'Princípio Ativo',
      },
      {
        accessorKey: 'product',
        header: 'Produto',
      },
      {
        accessorKey: 'appliedDose',
        header: 'Dose Aplicada',
      },
      {
        accessorKey: 'applicationMethod',
        header: 'Aplicação',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalMedication } = row

          return (
            <DropdownMenu.Root key={animalMedication.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalMedicationForm(animalMedication)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalMedicationContainer(animalMedication)
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
    [openDeleteAnimalMedicationContainer, openEditAnimalMedicationForm]
  )

  return {
    columns,
    animalMedications,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
