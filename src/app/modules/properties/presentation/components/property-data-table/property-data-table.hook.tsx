import { useEffect, useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { getPendingEntitiesByType } from '@/core/lib/offline'
import { EntitySyncBadge } from '@/core/presentation/components/sync/entity-sync-badge'
import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { usePropertyContext } from '../../hooks/property-context.hook'
import { usePropertiesQuery } from '../../hooks/queries/properties-query.hook'

import type { PropertyModel } from '../../../domain/models/properties-model'
import type { PropertyFilters } from '../../types'
import type { PendingEntityRecord } from '@/core/lib/offline/types'
import type { ColumnDef } from '@tanstack/react-table'

type PropertyRow = PropertyModel & { syncStatus?: string }

export function usePropertyDataTable() {
  const { openEditPropertyForm, openDeletePropertyContainer } =
    usePropertyContext()

  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<PropertyFilters>({})
  const debouncedFilters = useDebounce({ value: filters })
  const [pendingProperties, setPendingProperties] = useState<
    PendingEntityRecord[]
  >([])

  const { isLoading, properties } = usePropertiesQuery({
    filters: debouncedFilters,
    page,
  })

  useEffect(() => {
    const load = () =>
      getPendingEntitiesByType('PROPERTY').then(setPendingProperties)
    load()
    window.addEventListener('online', load)
    window.addEventListener('pending-entities:changed', load)
    return () => {
      window.removeEventListener('online', load)
      window.removeEventListener('pending-entities:changed', load)
    }
  }, [])

  const allProperties = useMemo<PropertyRow[]>(() => {
    const pending: PropertyRow[] = pendingProperties.map((p) => ({
      id: p.localId,
      name: p.data.name as string,
      syncStatus: p.status,
    }))
    return [...pending, ...(properties.resources ?? [])]
  }, [pendingProperties, properties])

  const columns = useMemo<ColumnDef<PropertyRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Propriedade',
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
          const { original: property } = row
          if (property.syncStatus === 'pending') return null

          return (
            <DropdownMenu.Root key={property.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openEditPropertyForm(property)
                  }}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openDeletePropertyContainer(property)
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
    [openDeletePropertyContainer, openEditPropertyForm]
  )

  return {
    columns,
    properties: {
      ...properties,
      resources: allProperties,
    },
    isLoading,
    filters,
    page,
    setFilters,
    setPage,
  }
}
