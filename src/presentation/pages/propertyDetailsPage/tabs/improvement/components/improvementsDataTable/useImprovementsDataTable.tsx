import { useMemo, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { DropdownMenu } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import { useImprovementContext } from '../../hooks/useImprovementContext'
import { useImprovements } from '../../hooks/useImprovements'

import type { ImprovementSort } from '../../types'
import type { ImprovementModel } from '@/domain/models/improvementModel'

export const useImprovementsDataTable = () => {
  const {
    propertyId,
    filters,
    openEditImprovementForm,
    openDeleteImprovementContainer,
  } = useImprovementContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<ImprovementSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, improvements } = useImprovements({
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
                <MoreHorizontal />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditImprovementForm(improvement)}
                >
                  <Pencil size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteImprovementContainer(improvement)}
                >
                  <Trash2 size={14} /> Excluir
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
