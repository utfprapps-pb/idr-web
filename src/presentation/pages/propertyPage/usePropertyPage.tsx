import { useEffect, useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { DropdownMenu } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import type { UsePropertyPageProps } from './types'
import type { PropertyModel } from '@/domain/models'
import type { Filters, Sort } from '@/domain/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

export const usePropertyPage = ({ getProperties }: UsePropertyPageProps) => {
	const [openSheet, setOpenSheet] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [filters, setFilters] = useState<Partial<Filters<keyof PropertyModel>>>(
		{
			name: ''
		}
	)
	const [page, setPage] = useState(1)
	const [sort, setSort] = useState<Sort<keyof PropertyModel> | undefined>()
	const [selectedProperty, setSelectedProperty] = useState<PropertyModel>()

	const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

	const {
		data: propertiesData,
		isError: isPropertiesError,
		isLoading: isPropertiesLoading
	} = useQuery({
		queryKey: ['properties', { page, ...debouncedFilters, ...sort }],
		queryFn: () =>
			getProperties.execute({
				pagination: { page },
				sort,
				filters: debouncedFilters
			}),
		staleTime: Infinity
	})

	const { properties, totalPages } = useMemo(
		() => ({
			properties: propertiesData ? propertiesData.resources : [],
			totalPages: propertiesData ? propertiesData.totalPages : 1
		}),
		[propertiesData]
	)

	const columns = useMemo<ColumnDef<PropertyModel>[]>(
		() => [
			{
				accessorKey: 'producer',
				header: 'Produtor'
			},
			{
				accessorKey: 'name',
				header: 'Propriedade'
			},
			{
				accessorKey: 'county',
				header: 'Município',
				accessorFn: ({ county }) => `${county.city} - ${county.state}`
			},
			{
				id: 'row-actions',
				header: '',
				cell: ({ row }) => {
					const { original: property } = row

					return (
						<DropdownMenu.Root key={property.id}>
							<DropdownMenu.Trigger>
								<MoreHorizontal />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item
									className="gap-2"
									onClick={() => {
										setSelectedProperty(property)
										setOpenSheet(true)
									}}
								>
									<Pencil size={14} /> Editar
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item
									className="gap-2"
									onClick={() => {
										setSelectedProperty(property)
										setOpenDelete(true)
									}}
								>
									<Trash2 size={14} /> Excluir
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					)
				}
			}
		],
		[]
	)

	useEffect(() => {
		if (isPropertiesError) {
			toast.error('Não foi possível listar as propriedades')
		}
	}, [isPropertiesError])

	return {
		openSheet,
		setOpenSheet,
		openDelete,
		setOpenDelete,
		selectedProperty,
		setSelectedProperty,
		columns,
		isPropertiesLoading,
		properties,
		totalPages,
		page,
		setPage,
		sort,
		setSort,
		filters,
		setFilters
	}
}
