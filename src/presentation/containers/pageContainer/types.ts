import type { TableContainerProps } from '@/presentation/containers/tableContainer/'
import type { RowData } from '@tanstack/react-table'

export type PageContainerProps<TData extends RowData> = {
	header: {
		title: string
		description: string
		buttonAddText: string
	}
	tableContainer: TableContainerProps<TData>
}
