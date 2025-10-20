import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useCultivationPestContext } from '../../hooks/cultivation-pest-context.hook'
import { useCultivationPestsQuery } from '../../hooks/queries/cultivation-pests-query.hook'

import type { CultivationPestModel } from '../../../domain/models/cultivation-pests-model'
import type { CultivationPestSort } from '../../types/cultivation-pest-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useCultivationPestDataTable() {
  const {
    propertyId,
    filters,
    openEditCultivationPestForm,
    openDeleteCultivationPestContainer,
  } = useCultivationPestContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<CultivationPestSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, cultivationPests } = useCultivationPestsQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<CultivationPestModel>[]>(
    () => [
      {
        accessorKey: 'cultivation',
        header: 'Cultura',
      },
      {
        accessorKey: 'pest',
        header: 'Identificação da Praga',
      },
      {
        accessorKey: 'infestationType',
        header: 'Tipo de Infestação',
      },

      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: cultivationPest } = row

          return (
            <DropdownMenu.Root key={cultivationPest.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditCultivationPestForm(cultivationPest)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteCultivationPestContainer(cultivationPest)
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
    [openDeleteCultivationPestContainer, openEditCultivationPestForm]
  )

  return {
    columns,
    cultivationPests,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
