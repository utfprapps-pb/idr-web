import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useProducerContext } from '../../hooks/producer-context.hook'
import { useProducersQuery } from '../../hooks/queries/use-producers-query.hook'

import type { ProducerModel } from '../../../domain/models/producers-model'
import type { ProducerFilters } from '../../types'
import type { ColumnDef } from '@tanstack/react-table'

export function useProducerDataTable() {
  const { openEditProducerForm, openDeleteProducerContainer } =
    useProducerContext()

  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<ProducerFilters>({})
  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, producers } = useProducersQuery({
    filters: debouncedFilters,
    page,
  })

  const columns = useMemo<ColumnDef<ProducerModel>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'cpf',
        header: 'CPF',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: producer } = row

          return (
            <DropdownMenu.Root key={producer.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openEditProducerForm(producer)
                  }}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openDeleteProducerContainer(producer)
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
    [openDeleteProducerContainer, openEditProducerForm]
  )

  return {
    columns,
    producers,
    isLoading,
    filters,
    page,
    setFilters,
    setPage,
  }
}
