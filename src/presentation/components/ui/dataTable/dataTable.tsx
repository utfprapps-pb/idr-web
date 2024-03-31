import { useMemo } from 'react'

import {
	RowData,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react'

import { Table } from '@/presentation/components/ui/table'
import { Tooltip } from '@/presentation/components/ui/tooltip'

import { Pagination } from '../pagination'

import { DataTableProps } from './types'

const REGISTERS_PER_PAGE = 10

export const DataTable = <TData extends RowData>({
	columns,
	data,
	sorting,
	pagination
}: DataTableProps<TData>) => {
	const { currentSorting, onSorting } = sorting
	const { currentPage, onPageChange } = pagination

	const table = useReactTable<TData>({
		columns,
		data,
		state: {
			sorting: currentSorting,
			pagination: currentPage
		},
		manualSorting: true,
		manualPagination: true,
		onSortingChange: onSorting,
		onPaginationChange: onPageChange,
		getCoreRowModel: getCoreRowModel()
	})

	const tooltipText = (value: 'asc' | 'desc' | false) => {
		if (value === 'asc') return 'Ordenar de forma de crescente'
		if (value === 'desc') return 'Ordenar de forma decrescente'

		return 'Limpar ordenação'
	}

	const lastPage = Math.ceil(data.length / REGISTERS_PER_PAGE)

	const page = useMemo(() => table.getState().pagination.pageIndex + 1, [table])

	const showInitialEllipsis = useMemo(() => page > 2, [page])

	const showFinalEllipsis = useMemo(() => page + 2 > 3, [page])

	const isBeforeLastPage = useMemo(
		() => page + 1 < data.length,
		[page, data.length]
	)

	return (
		<div className="flex flex-col gap-4">
			<div className="rounded-md border">
				<Table.Root>
					<Table.Header>
						{table.getHeaderGroups().map((headerGroup) => (
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
					<Table.Body>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<Table.Row
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<Table.Cell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</Table.Cell>
									))}
								</Table.Row>
							))
						) : (
							<Table.Row>
								<Table.Cell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table.Root>
			</div>
			<Pagination.Root>
				<Pagination.Content>
					<Pagination.Item
						isDisabled={!table.getCanPreviousPage()}
						onClick={table.previousPage}
					>
						<Pagination.Previous />
					</Pagination.Item>

					{showInitialEllipsis ? (
						<>
							<Pagination.Item onClick={() => table.setPageIndex(0)}>
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
								onClick={() => table.setPageIndex(lastPage - 1)}
								isDisabled={!table.getCanNextPage()}
							>
								<Pagination.Link>{lastPage}</Pagination.Link>
							</Pagination.Item>
						</>
					) : null}

					<Pagination.Item
						isDisabled={!table.getCanNextPage()}
						onClick={table.nextPage}
					>
						<Pagination.Next />
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
		</div>
	)
}
