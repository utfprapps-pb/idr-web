import { useMemo, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { DropdownMenu } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import { useMachineContext } from '../../hooks/useMachineContext'
import { useMachines } from '../../hooks/useMachines'

import type { MachineSort } from '../../types'
import type { MachineModel } from '@/domain/models/machineModel'

export const useMachinesDataTable = () => {
  const {
    propertyId,
    filters,
    openEditMachineForm,
    openDeleteMachineContainer,
  } = useMachineContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<MachineSort>()

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, machines } = useMachines({
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
                <MoreHorizontal />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditMachineForm(machine)}
                >
                  <Pencil size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteMachineContainer(machine)}
                >
                  <Trash2 size={14} /> Excluir
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
