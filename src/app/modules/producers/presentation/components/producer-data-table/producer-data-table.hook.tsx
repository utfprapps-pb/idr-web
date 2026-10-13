import { useEffect, useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { getPendingEntitiesByType } from '@/core/lib/offline'
import { EntitySyncBadge } from '@/core/presentation/components/sync/entity-sync-badge'
import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useProducerContext } from '../../hooks/producer-context.hook'
import { useProducersQuery } from '../../hooks/queries/use-producers-query.hook'

import type { ProducerModel } from '../../../domain/models/producers-model'
import type { ProducerFilters } from '../../types'
import type { PendingEntityRecord } from '@/core/lib/offline/types'
import type { ColumnDef } from '@tanstack/react-table'

type ProducerRow = ProducerModel & { syncStatus?: string }

export function useProducerDataTable() {
  const { openEditProducerForm, openDeleteProducerContainer } =
    useProducerContext()

  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<ProducerFilters>({})
  const debouncedFilters = useDebounce({ value: filters })
  const [pendingProducers, setPendingProducers] = useState<
    PendingEntityRecord[]
  >([])

  const { isLoading, producers } = useProducersQuery({
    filters: debouncedFilters,
    page,
  })

  useEffect(() => {
    const load = () =>
      getPendingEntitiesByType('PRODUCER').then(setPendingProducers)
    load()
    window.addEventListener('online', load)
    window.addEventListener('pending-entities:changed', load)
    return () => {
      window.removeEventListener('online', load)
      window.removeEventListener('pending-entities:changed', load)
    }
  }, [])

  const allProducers = useMemo<ProducerRow[]>(() => {
    const pending: ProducerRow[] = pendingProducers.map((p) => ({
      id: p.localId,
      name: p.data.name as string,
      cpf: p.data.cpf as string,
      syncStatus: p.status,
    }))
    return [...pending, ...(producers.resources ?? [])]
  }, [pendingProducers, producers])

  const columns = useMemo<ColumnDef<ProducerRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'cpf',
        header: 'CPF',
      },
      {
        id: 'sync-status',
        header: '',
        cell: ({ row }) => {
          const { syncStatus } = row.original
          if (!syncStatus || syncStatus === 'synced') return null
          return <EntitySyncBadge status={syncStatus as 'pending' | 'error'} />
        },
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: producer } = row
          if (producer.syncStatus === 'pending') return null

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
    producers: {
      ...producers,
      resources: allProducers,
    },
    isLoading,
    filters,
    page,
    setFilters,
    setPage,
  }
}
