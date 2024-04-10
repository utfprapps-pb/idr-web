import { RowData } from '@tanstack/react-table'

import { DataTable, Input } from '@/presentation/components/ui'

import { TableContainerProps } from './types'

export const TableContainer = <TData extends RowData>({
	table,
	inputSearch
}: TableContainerProps<TData>) => (
	<>
		<div className="self-start">
			<Input {...inputSearch} />
		</div>
		<DataTable<TData>
			columns={table.columns}
			data={table.data}
			totalPages={table.totalPages}
			sorting={table.sorting}
			pagination={table.pagination}
			loading={table.loading}
		/>
	</>
)
