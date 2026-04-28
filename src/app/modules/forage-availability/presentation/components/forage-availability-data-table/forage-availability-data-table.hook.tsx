import { useMemo, useState } from 'react'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { type ForageAvailabilityModel } from '../../../domain/models/forage-availability-model'
import { useForageAvailabilityContext } from '../../hooks/forage-availability-context.hook'
import { useForageAvailabilitiesQuery } from '../../hooks/queries/forage-availabilities-query.hook'
import { type ForageAvailabilitySort } from '../../types'

export function useForageAvailabilityDataTable() {
  const {
    propertyId,
    filters,
    openEditForageAvailabilityForm,
    openDeleteForageAvailabilityContainer,
  } = useForageAvailabilityContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<ForageAvailabilitySort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, forageAvailabilities } = useForageAvailabilitiesQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<ForageAvailabilityModel>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Data',
        cell: ({ row }) => format(row.original.date, 'dd/MM/yyyy'),
      },
      {
        accessorKey: 'forage',
        header: 'Forrageira',
      },
      {
        accessorKey: 'entranceCm',
        header: 'Entrada (cm)',
      },
      {
        accessorKey: 'residueCm',
        header: 'Resíduo (cm)',
      },
      {
        accessorKey: 'kgPerSquareMeter',
        header: 'Kg/m²',
      },
      {
        accessorKey: 'paddockArea',
        header: 'Área Piquete (m²)',
      },
      {
        accessorKey: 'efficiencyPercent',
        header: 'Eficiência (%)',
      },
      {
        accessorKey: 'numberOfCows',
        header: 'Nº Vacas',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: forageAvailability } = row

          return (
            <DropdownMenu.Root key={forageAvailability.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openEditForageAvailabilityForm(forageAvailability)
                  }
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeleteForageAvailabilityContainer(forageAvailability)
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
    [openDeleteForageAvailabilityContainer, openEditForageAvailabilityForm]
  )

  return {
    columns,
    forageAvailabilities,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
