import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { moneyMask } from '@/core/masker'
import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalSaleContext } from '../../hooks/animal-sale-context.hook'
import { useAnimalSalesQuery } from '../../hooks/queries/animal-sales-query.hook'

import type { AnimalSaleModel } from '../../../domain/models/animal-sales-model'
import type { AnimalSaleSort } from '../../types/animal-sale-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalSaleDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalSaleForm,
    openDeleteAnimalSaleContainer,
  } = useAnimalSaleContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalSaleSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, animalSales } = useAnimalSalesQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalSaleModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data da Compra',
        cell: ({ row }) => {
          const { original: animalSale } = row

          return animalSale.date
            ? format(new Date(animalSale.date), 'dd/MM/yyyy')
            : '-'
        },
      },
      {
        accessorKey: 'reason',
        header: 'Motivo da Venda',
      },
      {
        accessorKey: 'weight',
        header: 'Peso do Animal',
        cell: ({ row }) => {
          const { original: animalHeiferCalf } = row

          return animalHeiferCalf.weight ? `${animalHeiferCalf.weight} kg` : '-'
        },
      },
      {
        accessorKey: 'price',
        header: 'Valor Recebido',
        cell: ({ row }) => {
          const { original: animalSale } = row

          return moneyMask(animalSale.price)
        },
      },
      {
        accessorKey: 'destination',
        header: 'Destino',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalSale } = row

          return (
            <DropdownMenu.Root key={animalSale.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalSaleForm(animalSale)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteAnimalSaleContainer(animalSale)}
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [openDeleteAnimalSaleContainer, openEditAnimalSaleForm]
  )

  return {
    columns,
    animalSales,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
