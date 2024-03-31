import {
	ColumnDef,
	OnChangeFn,
	PaginationState,
	RowData,
	SortingState
} from '@tanstack/react-table'

export type DataTableProps<TData extends RowData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
	pagination: {
		currentPage: PaginationState
		onPageChange: OnChangeFn<PaginationState>
	}
	sorting: {
		currentSorting: SortingState
		onSorting: OnChangeFn<SortingState>
	}
}
