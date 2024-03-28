import { ColumnDef, RowData } from '@tanstack/react-table'

export type DataTableProps<TData extends RowData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
}
