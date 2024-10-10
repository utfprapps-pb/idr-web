import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import type { PropertyFilters, PropertySort } from '../types'
import type { IGetProperties } from '@/domain/useCases/property'

type Props = {
	filters: PropertyFilters
	page: number
	sort: PropertySort | null
	getProperties: IGetProperties
}

export const useProperties = ({
	filters,
	page,
	sort,
	getProperties,
}: Props) => {
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['properties', { page, sort: sort ?? 'withoutSort', filters }],
		queryFn: () =>
			getProperties.execute({
				pagination: { page },
				sort: sort ?? undefined,
				filters,
			}),
	})

	useEffect(() => {
		if (isError) toast.error('Erro ao buscar propriedades')
	}, [isError])

	return {
		properties: data ?? {
			resources: [],
			totalPages: 1,
		},
		isLoading,
		refetchProperties: refetch,
	}
}
