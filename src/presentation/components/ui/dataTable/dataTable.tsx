import { useCallback, useMemo } from 'react'

import {
	RowData,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react'

import { Table } from '@/presentation/components/ui/table'
import { Tooltip } from '@/presentation/components/ui/tooltip'

import { Loading } from '../loading'
import { Pagination } from '../pagination'

import { DataTableProps } from './types'

export const DataTable = <TData extends RowData>({
	columns,
	data,
	sorting,
	pagination,
	totalPages,
	loading = false
}: DataTableProps<TData>) => {
	const { currentSorting, onSorting } = sorting
	const { currentPage, onPageChange } = pagination

	const {
		getState,
		getRowModel,
		getHeaderGroups,
		previousPage,
		nextPage,
		setPageIndex,
		getCanPreviousPage,
		getCanNextPage
	} = useReactTable<TData>({
		columns,
		data,
		state: {
			sorting: currentSorting,
			pagination: currentPage
		},
		manualSorting: true,
		manualPagination: true,
		pageCount: totalPages,
		onSortingChange: onSorting,
		onPaginationChange: onPageChange,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	})

	const page = getState().pagination.pageIndex + 1

	const tooltipText = (value: 'asc' | 'desc' | false) => {
		if (value === 'asc') return 'Ordenar de forma de crescente'
		if (value === 'desc') return 'Ordenar de forma decrescente'

		return 'Limpar ordenação'
	}

	const showInitialEllipsis = useMemo(() => page > 2, [page])

	const showFinalEllipsis = useMemo(() => page + 2 > 3, [page])

	const isBeforeLastPage = useMemo(
		() => page + 1 < totalPages,
		[page, totalPages]
	)

	const tableBody = useCallback(() => {
		if (loading) {
			return (
				<Table.Row>
					<Table.Cell colSpan={columns.length}>
						<Loading className="flex justify-center" size="lg" />
					</Table.Cell>
				</Table.Row>
			)
		}

		if (!getRowModel().rows.length)
			return (
				<Table.Row>
					<Table.Cell colSpan={columns.length} className="h-24 text-center">
						No results.
					</Table.Cell>
				</Table.Row>
			)

		return getRowModel().rows.map((row) => (
			<Table.Row key={row.id} data-state={row.getIsSelected() && 'selected'}>
				{row.getVisibleCells().map((cell) => (
					<Table.Cell key={cell.id}>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</Table.Cell>
				))}
			</Table.Row>
		))
	}, [columns.length, getRowModel, loading])

	return (
		<div className="flex flex-col gap-4">
			<div className="rounded-md border">
				<Table.Root>
					<Table.Header>
						{getHeaderGroups().map((headerGroup) => (
							<Table.Row key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Table.Head
										key={header.id}
										colSpan={header.colSpan}
										onClick={header.column.getToggleSortingHandler()}
										className={
											header.column.getCanSort()
												? 'cursor-pointer select-none'
												: ''
										}
									>
										{header.isPlaceholder ? null : (
											<Tooltip.Provider>
												<Tooltip.Root>
													<Tooltip.Trigger>
														<div className="inline-flex items-center gap-2">
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
															{{
																asc: <ArrowDownNarrowWide size={20} />,
																desc: <ArrowUpNarrowWide size={20} />
															}[header.column.getIsSorted() as string] ?? null}
														</div>
													</Tooltip.Trigger>
													<Tooltip.Content>
														<p>
															{tooltipText(header.column.getNextSortingOrder())}
														</p>
													</Tooltip.Content>
												</Tooltip.Root>
											</Tooltip.Provider>
										)}
									</Table.Head>
								))}
							</Table.Row>
						))}
					</Table.Header>
					<Table.Body>{tableBody()}</Table.Body>
				</Table.Root>
			</div>
			<Pagination.Root>
				<Pagination.Content>
					<Pagination.Item
						isDisabled={!getCanPreviousPage()}
						onClick={previousPage}
					>
						<Pagination.Previous />
					</Pagination.Item>

					{showInitialEllipsis ? (
						<>
							<Pagination.Item onClick={() => setPageIndex(0)}>
								<Pagination.Link>1</Pagination.Link>
							</Pagination.Item>

							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						</>
					) : null}

					<Pagination.Item>
						<Pagination.Link isActive>{page}</Pagination.Link>
					</Pagination.Item>

					{isBeforeLastPage ? (
						<>
							{showFinalEllipsis ? (
								<Pagination.Item>
									<Pagination.Ellipsis />
								</Pagination.Item>
							) : null}

							<Pagination.Item
								onClick={() => setPageIndex(totalPages - 1)}
								isDisabled={!getCanNextPage()}
							>
								<Pagination.Link>{totalPages}</Pagination.Link>
							</Pagination.Item>
						</>
					) : null}

					<Pagination.Item isDisabled={!getCanNextPage()} onClick={nextPage}>
						<Pagination.Next />
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
		</div>
	)
}
