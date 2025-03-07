import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useImprovementContext } from '../../hooks/improvement-context.hook'
import { useImprovementsQuery } from '../../hooks/queries/improvements-query.hook'

import type { ImprovementModel } from '../../../domain/models/improvements-model'
import type { ImprovementSort } from '../../types'
import type { ColumnDef } from '@tanstack/react-table'

export function useImprovementDataTable() {
  const {
    propertyId,
    filters,
    openEditImprovementForm,
    openDeleteImprovementContainer,
  } = useImprovementContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<ImprovementSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, improvements } = useImprovementsQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<ImprovementModel>[]>(
    () => [
      {
        accessorKey: 'description',
        header: 'Benfeitoria',
      },
      {
        accessorKey: 'amount',
        header: 'Quantidade',
      },
      {
        accessorKey: 'unitPrice',
        header: 'Valor unitário',
      },
      {
        accessorKey: 'percentDairyCattle',
        header: '% Gado de Leite',
      },
      {
        accessorKey: 'usefulLife',
        header: 'Vida Útil',
      },
      {
        accessorKey: 'acquisitionDate',
        header: 'Aquisição',
      },
      {
        accessorKey: 'moneyDairyCattle',
        header: 'Valor Para o Gado Leiteiro',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: improvement } = row

          return (
            <DropdownMenu.Root key={improvement.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditImprovementForm(improvement)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteImprovementContainer(improvement)}
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [openDeleteImprovementContainer, openEditImprovementForm]
  )

  return {
    columns,
    improvements,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
