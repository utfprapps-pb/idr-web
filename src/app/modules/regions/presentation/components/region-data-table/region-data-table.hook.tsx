import { useMemo, useState } from 'react'

import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { DropdownMenu } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useRegionsQuery } from '../../hooks/queries/use-regions-query.hook'
import { useRegionContext } from '../../hooks/region-context.hook'

import type { RegionModel } from '../../../domain/models/regions-model'
import type { ColumnDef } from '@tanstack/react-table'

export function useRegionDataTable() {
  const { openEditRegionForm, openDeleteRegionContainer } = useRegionContext()

  const [page, setPage] = useState(1)
  const [terms, setTerms] = useState('')
  const debouncedTerms = useDebounce({ value: terms })

  const { isLoading, regions } = useRegionsQuery({
    terms: debouncedTerms,
    page,
  })

  const columns = useMemo<ColumnDef<RegionModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => {
          const { original: region } = row

          return (
            <DropdownMenu.Root key={region.id}>
              <DropdownMenu.Trigger>
                <MoreHorizontalIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openEditRegionForm(region)
                  }}
                >
                  <PencilIcon size={14} /> Editar
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  className="gap-2"
                  onClick={(event) => {
                    event.stopPropagation()
                    openDeleteRegionContainer(region)
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
    [openDeleteRegionContainer, openEditRegionForm]
  )

  return {
    columns,
    regions,
    isLoading,
    terms,
    page,
    setTerms,
    setPage,
  }
}
