import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useGeneralCultivationDiseaseContext } from '../../hooks/general-cultivation-disease-context.hook'
import { useGeneralCultivationDiseasesQuery } from '../../hooks/queries/general-cultivation-diseases-query.hook'

import type { GeneralCultivationDiseaseModel } from '../../../domain/models/general-cultivation-diseases-model'
import type { GeneralCultivationDiseaseSort } from '../../types/general-cultivation-disease-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useGeneralCultivationDiseaseDataTable() {
  const {
    filters,
    openEditGeneralCultivationDiseaseForm,
    openDeleteGeneralCultivationDiseaseContainer,
  } = useGeneralCultivationDiseaseContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<GeneralCultivationDiseaseSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, generalCultivationDiseases } =
    useGeneralCultivationDiseasesQuery({
      filters: debouncedFilters,
      page,
      sort,
    })

  const columns = useMemo<ColumnDef<GeneralCultivationDiseaseModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: generalCultivationDisease } = row

          return (
            <DropdownMenu.Root key={generalCultivationDisease.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditGeneralCultivationDiseaseForm(
                      generalCultivationDisease
                    )
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteGeneralCultivationDiseaseContainer(
                      generalCultivationDisease
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
      openDeleteGeneralCultivationDiseaseContainer,
      openEditGeneralCultivationDiseaseForm,
    ]
  )

  return {
    columns,
    generalCultivationDiseases,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
