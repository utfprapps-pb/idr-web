import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { moneyMask } from '@/core/masker'
import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalPurchaseContext } from '../../hooks/animal-purchase-context.hook'
import { useAnimalPurchasesQuery } from '../../hooks/queries/animal-purchases-query.hook'

import type { AnimalPurchaseModel } from '../../../domain/models/animal-purchases-model'
import type { AnimalPurchaseSort } from '../../types/animal-purchase-types'
import type { ColumnDef } from '@tanstack/react-table'

export function useAnimalPurchaseDataTable() {
  const {
    propertyId,
    animalId,
    filters,
    openEditAnimalPurchaseForm,
    openDeleteAnimalPurchaseContainer,
  } = useAnimalPurchaseContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<AnimalPurchaseSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, animalPurchases } = useAnimalPurchasesQuery({
    propertyId,
    animalId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<AnimalPurchaseModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data da Compra',
        cell: ({ row }) => {
          const { original: animalPurchase } = row

          return animalPurchase.date
            ? format(new Date(animalPurchase.date), 'dd/MM/yyyy')
            : '-'
        },
      },
      {
        accessorKey: 'birthDate',
        header: 'Data do Nascimento',
        cell: ({ row }) => {
          const { original: animalPurchase } = row

          return animalPurchase.birthDate
            ? format(new Date(animalPurchase.birthDate), 'dd/MM/yyyy')
            : '-'
        },
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
        header: 'Valor pago',
        cell: ({ row }) => {
          const { original: animalPurchase } = row

          return moneyMask(animalPurchase.price)
        },
      },

      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: animalPurchase } = row

          return (
            <DropdownMenu.Root key={animalPurchase.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditAnimalPurchaseForm(animalPurchase)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteAnimalPurchaseContainer(animalPurchase)
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
    [openDeleteAnimalPurchaseContainer, openEditAnimalPurchaseForm]
  )

  return {
    columns,
    animalPurchases,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
