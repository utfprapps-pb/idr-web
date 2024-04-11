import { useState, useCallback, useEffect } from 'react'

import { ColumnDef, SortingState, PaginationState } from '@tanstack/react-table'

import { IRequestInterface } from '@/domain/shared'
import { IListParams } from '@/domain/shared/listParamsInterface'
import { IListResponse } from '@/domain/shared/listResponseInterface'
import { catchError } from '@/main/utils'

export type ListTableParams<TModel extends Record<string, unknown>> = {
	columns: ColumnDef<TModel>[]
}

export type UseListTableParams<
	TModel extends Record<string, unknown>,
	TKeyOfModel extends string = string
> = {
	getData: IRequestInterface<IListParams<TKeyOfModel>, IListResponse<TModel>>
}

export const listTable =
	<
		TModel extends Record<string, unknown>,
		TKeyOfModel extends string = string
	>({
		columns
	}: ListTableParams<TModel>) =>
	({ getData }: UseListTableParams<TModel, TKeyOfModel>) => {
		const [sorting, setSorting] = useState<SortingState>([])
		const [{ pageIndex, pageSize }, setPage] = useState<PaginationState>({
			pageIndex: 0,
			pageSize: 0
		})
		const [filters, setFilters] = useState<Record<TKeyOfModel, string>>(
			{} as Record<TKeyOfModel, string>
		)

		const [loading, setLoading] = useState(false)
		const [data, setData] = useState<TModel[]>([])
		const [totalPages, setTotalPages] = useState<number>(0)

		const handleGetData = useCallback(
			async (params: { filters: Record<TKeyOfModel, string> }) => {
				try {
					setLoading(true)

					const [fieldToSort] = sorting ?? {}

					const response = await getData.execute({
						pagination: {
							page: pageIndex + 1
						},
						filters: params.filters,
						...(fieldToSort && {
							sort: {
								direction: fieldToSort.desc ? 'desc' : 'asc',
								field: fieldToSort.id as TKeyOfModel
							}
						})
					})

					setData(response.data)
					setTotalPages(response.totalPages)
				} finally {
					setLoading(false)
				}
			},
			[sorting, getData, pageIndex]
		)

		useEffect(() => {
			catchError(handleGetData)
		}, [handleGetData])

		return {
			columns,
			data,
			totalPages,
			loading,
			filters,
			setFilters,
			handleGetData,
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
