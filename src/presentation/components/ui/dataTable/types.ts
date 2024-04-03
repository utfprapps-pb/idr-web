import {
	ColumnDef,
	OnChangeFn,
	RowData,
	SortingState
} from '@tanstack/react-table'

export type DataTableProps<TData extends RowData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
	sorting: SortingState
	onSorting: OnChangeFn<SortingState>
}
