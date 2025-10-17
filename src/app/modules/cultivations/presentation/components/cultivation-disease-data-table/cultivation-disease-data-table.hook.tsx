import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useCultivationDiseaseContext } from '../../hooks/cultivation-disease-context.hook'
import { useCultivationDiseasesQuery } from '../../hooks/queries/cultivation-diseases-query.hook'

import type { CultivationDiseaseModel } from '../../../domain/models/cultivation-diseases-model'
import type { CultivationDiseaseSort } from '../../types/cultivation-disease-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useCultivationDiseaseDataTable() {
  const {
    propertyId,
    filters,
    openEditCultivationDiseaseForm,
    openDeleteCultivationDiseaseContainer,
  } = useCultivationDiseaseContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<CultivationDiseaseSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, cultivationDiseases } = useCultivationDiseasesQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<CultivationDiseaseModel>[]>(
    () => [
      {
        accessorKey: 'cultivation',
        header: 'Cultura',
      },
      {
        accessorKey: 'disease',
        header: 'Identificação da Doença',
      },
      {
        accessorKey: 'infestationType',
        header: 'Tipo de Infestação',
      },

      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: cultivationDisease } = row

          return (
            <DropdownMenu.Root key={cultivationDisease.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditCultivationDiseaseForm(cultivationDisease)
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteCultivationDiseaseContainer(cultivationDisease)
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
    [openDeleteCultivationDiseaseContainer, openEditCultivationDiseaseForm]
  )

  return {
    columns,
    cultivationDiseases,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
