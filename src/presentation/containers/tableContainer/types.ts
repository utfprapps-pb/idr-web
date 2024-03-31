import { RowData } from '@tanstack/react-table'

import type { DataTableProps, InputProps } from '@/presentation/components/ui'

export type TableContainerProps<TData extends RowData> = {
	table: DataTableProps<TData>
	inputSearch: InputProps
}
