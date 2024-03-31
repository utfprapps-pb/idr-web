import { RowData } from '@tanstack/react-table'

import { DataTable, Input } from '@/presentation/components/ui'

import { TableContainerProps } from './types'

export const TableContainer = <TData extends RowData>({
	table,
	inputSearch
}: TableContainerProps<TData>) => (
	<>
		<Input {...inputSearch} />
		<DataTable<TData>
			columns={table.columns}
			data={table.data}
			sorting={table.sorting}
			pagination={table.pagination}
		/>
	</>
)
