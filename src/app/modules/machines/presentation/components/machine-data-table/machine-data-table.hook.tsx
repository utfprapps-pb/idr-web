import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useMachineContext } from '../../hooks/machine-context.hook'
import { useMachinesQuery } from '../../hooks/queries/machines-query.hook'

import type { MachineModel } from '../../../domain/models/machines-model'
import type { MachineSort } from '../../types'
import type { ColumnDef } from '@tanstack/react-table'

export function useMachineDataTable() {
  const {
    propertyId,
    filters,
    openEditMachineForm,
    openDeleteMachineContainer,
  } = useMachineContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<MachineSort>()

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, machines } = useMachinesQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<MachineModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Máquina',
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
          const { original: machine } = row

          return (
            <DropdownMenu.Root key={machine.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditMachineForm(machine)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteMachineContainer(machine)}
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [openDeleteMachineContainer, openEditMachineForm]
  )

  return {
    columns,
    machines,
    isLoading,
    page,
    sort,
    setSort,
    setPage,
  }
}
