import { useCallback, useMemo, useState } from 'react'

import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react'

import {
  Button,
  DropdownMenu,
  Tooltip,
} from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useForageContext } from '../../hooks/forage-context.hook'
import { useForagesQuery } from '../../hooks/queries/forages-query.hook'

import type { ForageModel } from '../../../domain/models/forages-model'
import type { ForageSort } from '../../types'
import type { ColumnDef } from '@tanstack/react-table'

export function useForageDataTable() {
  const { propertyId, filters, openEditForageForm, openDeleteForageContainer } =
    useForageContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<ForageSort>()

  const [selectedObservation, setSelectedObservation] = useState<string>()
  const [isOpenObservationDialog, setIsOpenObservationDialog] = useState(false)

  const handleOpenObservationDialog = useCallback((observation: string) => {
    setSelectedObservation(observation)
    setIsOpenObservationDialog(true)
  }, [])

  const handleCloseObservationDialog = useCallback(() => {
    setSelectedObservation(undefined)
    setIsOpenObservationDialog(false)
  }, [])

  const debouncedFilters = useDebounce({ value: filters })

  const { isLoading, forages } = useForagesQuery({
    propertyId,
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<ForageModel>[]>(
    () => [
      {
        accessorKey: 'cultivation',
        header: 'Cultivo',
      },
      {
        accessorKey: 'area',
        header: 'Área',
      },
      {
        accessorKey: 'averageCost',
        header: 'Custo médio',
      },
      {
        accessorKey: 'usefulLife',
        header: 'Vida útil',
      },
      {
        accessorKey: 'formation',
        header: 'Formação',
      },
      {
        accessorKey: 'growthCycle',
        header: 'Ciclo de crescimento',
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
      },
      {
        id: 'observation',
        header: 'Observação',
        cell: ({ row }) => {
          const { observation } = row.original

          if (!observation) {
            return (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger>
                    <Button type="button" variant="ghost" size="icon" disabled>
                      <EyeIcon className="size-5" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>Sem observação</Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            )
          }

          return (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleOpenObservationDialog(observation)}
            >
              <EyeIcon className="size-5" />
            </Button>
          )
        },
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: forage } = row

          return (
            <DropdownMenu.Root key={forage.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditForageForm(forage)}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteForageContainer(forage)}
                >
                  <Trash2Icon size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [handleOpenObservationDialog, openDeleteForageContainer, openEditForageForm]
  )

  return {
    columns,
    forages,
    isLoading,
    selectedObservation,
    isOpenObservationDialog,
    handleCloseObservationDialog,
    page,
    sort,
    setSort,
    setPage,
  }
}
