import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useGeneralCultivationPestContext } from '../../hooks/general-cultivation-pest-context.hook'
import { useGeneralCultivationPestsQuery } from '../../hooks/queries/general-cultivation-pests-query.hook'

import type { GeneralCultivationPestModel } from '../../../domain/models/general-cultivation-pests-model'
import type { GeneralCultivationPestSort } from '../../types/general-cultivation-pest-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useGeneralCultivationPestDataTable() {
  const {
    filters,
    openEditGeneralCultivationPestForm,
    openDeleteGeneralCultivationPestContainer,
  } = useGeneralCultivationPestContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<GeneralCultivationPestSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, generalCultivationPests } =
    useGeneralCultivationPestsQuery({
      filters: debouncedFilters,
      page,
      sort,
    })

  const columns = useMemo<ColumnDef<GeneralCultivationPestModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: generalCultivationPest } = row

          return (
            <DropdownMenu.Root key={generalCultivationPest.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditGeneralCultivationPestForm(generalCultivationPest)
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteGeneralCultivationPestContainer(
                      generalCultivationPest
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
      openDeleteGeneralCultivationPestContainer,
      openEditGeneralCultivationPestForm,
    ]
  )

  return {
    columns,
    generalCultivationPests,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
