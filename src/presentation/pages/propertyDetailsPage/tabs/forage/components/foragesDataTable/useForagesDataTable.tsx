import { useCallback, useMemo, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button, DropdownMenu, Tooltip } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import { useForageContext } from '../../hooks/useForageContext'
import { useForage } from '../../hooks/useForages'
import { ForageSort } from '../../types'

import type { ForageModel } from '@/domain/models/forageModel'

export const useForagesDataTable = () => {
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

  const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

  const { isLoading, forages } = useForage({
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
                <MoreHorizontal />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditForageForm(forage)}
                >
                  <Pencil size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openDeleteForageContainer(forage)}
                >
                  <Trash2 size={14} /> Excluir
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
