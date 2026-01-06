import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useGeneralCultivationContext } from '../../hooks/general-cultivation-context.hook'
import { useGeneralCultivationsQuery } from '../../hooks/queries/general-cultivations-query.hook'

import type { GeneralCultivationModel } from '../../../domain/models/general-cultivations-model'
import type { GeneralCultivationSort } from '../../types/general-cultivation-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useGeneralCultivationDataTable() {
  const {
    filters,
    openEditGeneralCultivationForm,
    openDeleteGeneralCultivationContainer,
  } = useGeneralCultivationContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<GeneralCultivationSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, generalCultivations } = useGeneralCultivationsQuery({
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<GeneralCultivationModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Cultivo',
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: generalCultivation } = row

          return (
            <DropdownMenu.Root key={generalCultivation.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditGeneralCultivationForm(generalCultivation)
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteGeneralCultivationContainer(generalCultivation)
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
    [openDeleteGeneralCultivationContainer, openEditGeneralCultivationForm]
  )

  return {
    columns,
    generalCultivations,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
