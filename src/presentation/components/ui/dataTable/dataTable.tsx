import {
	RowData,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'

import { Table } from '../table'

import { DataTableProps } from './types'

export const DataTable = <TData extends RowData>({
	columns,
	data
}: DataTableProps<TData>) => {
	const table = useReactTable<TData>({
		columns,
		data,
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className="rounded-md border">
			<Table.Root>
				<Table.Header>
					{table.getHeaderGroups().map((headerGroup) => (
						<Table.Row key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Table.Head key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
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
