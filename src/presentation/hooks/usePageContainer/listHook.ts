import { useState, useCallback, useEffect } from 'react'

import { catchError } from '@/main/utils'

import type { GetResourcesService, RecordWithId, TextBuilder } from './types'
import type { SortingState, PaginationState } from '@tanstack/react-table'

export type ListHookProps<TModel extends RecordWithId> = {
	texts: {
		getResources: {
			error?: TextBuilder<TModel>
		}
	}
}

export const listHook =
	<TModel extends RecordWithId = RecordWithId>({
		texts: {
			getResources: { error }
		}
	}: ListHookProps<TModel>) =>
	(getResources: GetResourcesService<TModel>) => {
		const [loading, setLoading] = useState(true)
		const [sorting, setSorting] = useState<SortingState>([])
		const [filters, setFilters] = useState<Record<keyof TModel, string>>(
			{} as Record<keyof TModel, string>
		)
		const [{ pageIndex, pageSize }, setPage] = useState<PaginationState>({
			pageIndex: 0,
			pageSize: 0
		})

		const [resources, setResources] = useState<TModel[]>([])
		const [totalPages, setTotalPages] = useState<number>(0)

		const handleGetResources = useCallback(async () => {
			try {
				setLoading(true)
				const [fieldToSort] = sorting ?? {}

				const response = await getResources.execute({
					pagination: {
						page: pageIndex + 1
					},
					filters,
					...(fieldToSort && {
						sort: {
							direction: fieldToSort.desc ? 'desc' : 'asc',
							field: fieldToSort.id as keyof TModel
						}
					})
				})

				setResources(response.resources)
				setTotalPages(response.totalPages)
			} finally {
				setLoading(false)
			}
		}, [sorting, getResources, pageIndex, filters])

		useEffect(() => {
			catchError(handleGetResources, error?.())
		}, [handleGetResources])

		return {
			resources,
			totalPages,
			loading,
			setLoading,
			filters,
			setFilters,
			handleGetResources,
			sorting: {
				currentSorting: sorting,
				onSorting: setSorting
			},
			pagination: {
				currentPage: { pageIndex, pageSize },
				onPageChange: setPage
			}
		}
	}
