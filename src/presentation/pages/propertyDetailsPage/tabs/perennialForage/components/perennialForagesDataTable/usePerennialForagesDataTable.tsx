import { useCallback, useMemo, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { PerennialForageModel } from '@/domain/models/perennialForageModel'
import { Button, DropdownMenu } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import { usePerennialForageContext } from '../../hooks/usePerennialForageContext'
import { usePerennialForages } from '../../hooks/usePerennialForages'
import { PerennialForageSort } from '../../types'

export const usePerennialForagesDataTable = () => {
  const {
    filters,
    openEditPerennialForageForm,
    openDeletePerennialForageContainer,
  } = usePerennialForageContext()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<PerennialForageSort>()

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

  const { isLoading, perennialForages } = usePerennialForages({
    filters: debouncedFilters,
    page,
    sort,
  })

  const columns = useMemo<ColumnDef<PerennialForageModel>[]>(
    () => [
      {
        accessorKey: 'description',
        header: 'Descrição',
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
        accessorKey: 'type',
        header: 'Tipo',
      },
      {
        id: 'observation',
        header: 'Observação',
        cell: ({ row }) => {
          const { observation } = row.original

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
          const { original: perennialForage } = row

          return (
            <DropdownMenu.Root key={perennialForage.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontal />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() => openEditPerennialForageForm(perennialForage)}
                >
                  <Pencil size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={() =>
                    openDeletePerennialForageContainer(perennialForage)
                  }
                >
                  <Trash2 size={14} /> Excluir
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        },
      },
    ],
    [
      handleOpenObservationDialog,
      openDeletePerennialForageContainer,
      openEditPerennialForageForm,
    ]
  )

  return {
    columns,
    perennialForages,
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
