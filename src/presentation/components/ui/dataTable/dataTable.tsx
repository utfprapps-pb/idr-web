import {
	RowData,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react'

import { Table } from '@/presentation/components/ui/table'
import { Tooltip } from '@/presentation/components/ui/tooltip'

import { DataTableProps } from './types'

export const DataTable = <TData extends RowData>({
	columns,
	data,
	sorting,
	onSorting
}: DataTableProps<TData>) => {
	const table = useReactTable<TData>({
		columns,
		data,
		state: {
			sorting
		},
		manualSorting: true,
		onSortingChange: onSorting,
		getCoreRowModel: getCoreRowModel()
	})

	const tooltipText = (value: 'asc' | 'desc' | false) => {
		if (value === 'asc') return 'Ordenar de forma de crescente'
		if (value === 'desc') return 'Ordenar de forma decrescente'

		return 'Limpar ordenação'
	}

	return (
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
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Table.Cell>
								))}
							</Table.Row>
						))
					) : (
						<Table.Row>
							<Table.Cell colSpan={columns.length} className="h-24 text-center">
								No results.
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table.Root>
		</div>
	)
}
