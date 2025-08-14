import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalPregnancyDiagnosisContext } from '../../hooks/animal-pregnancy-diagnosis-context.hook'
import { useAnimalPregnancyDiagnosesQuery } from '../../hooks/queries/animal-pregnancy-diagnoses-query.hook'

import type { AnimalPregnancyDiagnosisModel } from '../../../domain/models/animal-pregnancy-diagnoses-model'
import type { AnimalPregnancyDiagnosisSort } from '../../types/animal-pregnancy-diagnosis-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalPregnancyDiagnosisDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalPregnancyDiagnosisForm,
    openDeleteAnimalPregnancyDiagnosisContainer,
  } = useAnimalPregnancyDiagnosisContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalPregnancyDiagnosisSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, animalPregnancyDiagnoses } =
    useAnimalPregnancyDiagnosesQuery({
      propertyId,
      animalId,
      filters: debouncedFilters,
      page,
      sort,
    })

  const columns = useMemo<ColumnDef<AnimalPregnancyDiagnosisModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data do diagnóstico',
        cell: ({ row }) => {
          const { original: animalPregnancyDiagnosis } = row

          return animalPregnancyDiagnosis.date
            ? format(new Date(animalPregnancyDiagnosis.date), 'dd/MM/yyyy')
            : '-'
        },
      },
      {
        accessorKey: 'lastInseminationDate',
        header: 'Última data de inseminação',
        cell: ({ row }) => {
          const { original: animalPregnancyDiagnosis } = row

          return animalPregnancyDiagnosis.lastInseminationDate
            ? format(
                new Date(animalPregnancyDiagnosis.lastInseminationDate),
                'dd/MM/yyyy'
              )
            : '-'
        },
      },

      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalPregnancyDiagnosis } = row

          return (
            <DropdownMenu.Root key={animalPregnancyDiagnosis.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditAnimalPregnancyDiagnosisForm(
                      animalPregnancyDiagnosis
                    )
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalPregnancyDiagnosisContainer(
                      animalPregnancyDiagnosis
                    )
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
      openDeleteAnimalPregnancyDiagnosisContainer,
      openEditAnimalPregnancyDiagnosisForm,
    ]
  )

  return {
    columns,
    animalPregnancyDiagnoses,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
