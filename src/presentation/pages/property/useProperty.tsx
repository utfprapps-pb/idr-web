import { useEffect, useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import type { PropertyModel } from '@/domain/models'
import { DropdownMenu } from '@/presentation/components/ui'

import type { PropertyPageProps } from './types'
import type { Filters, Sort } from '@/domain/shared/types'

export const usePropertyPage = ({ getProperties }: PropertyPageProps) => {
	const [filters, setFilters] = useState<Partial<Filters<keyof PropertyModel>>>(
		{
			name: ''
		}
	)
	const [page, setPage] = useState(1)
	const [sort, setSort] = useState<Sort<keyof PropertyModel>>({
		direction: 'asc',
		field: 'name'
	})

	const {
		data: properties,
		isError: isPropertiesError,
		isLoading: isPropertiesLoading,
		refetch: handleGetProperties
	} = useQuery({
		queryKey: ['properties', { ...filters }],
		queryFn: () =>
			getProperties.execute({
				pagination: { page },
				sort
			}),
		initialData: {
			resources: [],
			totalPages: 0
		}
	})

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
					const { id } = row.original

					return (
						<DropdownMenu.Root key={id}>
							<DropdownMenu.Trigger>
								<MoreHorizontal />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item className="gap-2">
									<Pencil size={14} /> Editar
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item className="gap-2">
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
			toast('Não foi possível listar as propriedades')
		}
	}, [isPropertiesError])

	return {
		columns,
		isPropertiesLoading,
		properties,
		handleGetProperties,
		page,
		setPage,
		sort,
		setSort,
		filters,
		setFilters
	}
}
