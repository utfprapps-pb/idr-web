import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { formatNumber } from '@/core/masker'
import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useNutritionalBalancingContext } from '../../hooks/nutritional-balancing-context.hook'
import { useNutritionalBalancingsQuery } from '../../hooks/queries/nutritional-balancings-query.hook'

import type { NutritionalBalancingModel } from '../../../domain/models/nutritional-balancings-model'
import type { NutritionalBalancingSort } from '../../types/nutritional-balancing-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useNutritionalBalancingDataTable() {
  const {
    propertyId,
    filters,
    openEditNutritionalBalancingScreen,
    openDeleteNutritionalBalancingContainer,
  } = useNutritionalBalancingContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<NutritionalBalancingSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, nutritionalBalancings } = useNutritionalBalancingsQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<NutritionalBalancingModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data',
        cell: ({ row }) => {
          const { original: nutritionalBalancing } = row

          return nutritionalBalancing.date
            ? format(nutritionalBalancing.date, 'dd/MM/yyyy')
            : '-'
        },
      },
      {
        accessorKey: 'animal',
        header: 'Animal',
      },
      {
        accessorKey: 'breed',
        header: 'Tipo de Raça',
      },
      {
        accessorKey: 'weight',
        header: 'Peso',
        cell: ({ row }) => {
          const { original: nutritionalBalancing } = row

          return formatNumber(nutritionalBalancing.weight, { suffix: 'kg' })
        },
      },
      {
        accessorKey: 'milkProduction',
        header: 'Produção de Leite',
        cell: ({ row }) => {
          const { original: nutritionalBalancing } = row

          return formatNumber(nutritionalBalancing.milkProduction, {
            suffix: 'kg/dia',
          })
        },
      },
      {
        accessorKey: 'estimatedMilkProduction',
        header: 'Produção de Leite Estimada',
        cell: ({ row }) => {
          const { original: nutritionalBalancing } = row

          return formatNumber(nutritionalBalancing.estimatedMilkProduction, {
            suffix: 'kg/dia',
          })
        },
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: nutritionalBalancing } = row

          return (
            <DropdownMenu.Root key={nutritionalBalancing.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openEditNutritionalBalancingScreen(nutritionalBalancing)
                  }}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openDeleteNutritionalBalancingContainer(
                      nutritionalBalancing
                    )
                  }}
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
      openDeleteNutritionalBalancingContainer,
      openEditNutritionalBalancingScreen,
    ]
  )

  return {
    columns,
    nutritionalBalancings,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
