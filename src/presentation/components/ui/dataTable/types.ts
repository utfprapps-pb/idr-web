import { ColumnDef, RowData } from '@tanstack/react-table'

import { Sort } from '@/domain/shared/types'

export type DataTableProps<TData extends RowData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
	totalPages: number
	pagination: {
		currentPage: number
		onPageChange: (page: number) => void
	}
	sorting: {
		currentSorting?: Sort<keyof TData>
		onSorting: (sort?: Sort<keyof TData>) => void
	}
	loading?: boolean
}
