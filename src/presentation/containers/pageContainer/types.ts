import type { SheetContainerProps } from '@/presentation/containers/sheetContainer'
import type { TableContainerProps } from '@/presentation/containers/tableContainer/'
import type { RowData } from '@tanstack/react-table'
import type { FieldValues } from 'react-hook-form'

export type PageContainerProps<
	TData extends RowData & { id: string },
	TValues extends FieldValues
> = {
	header: {
		title: string
		description: string
	}
	sheetContainer: SheetContainerProps<TValues>
	tableContainer: TableContainerProps<TData>
	openUpdateSheetContainer: (id: string) => void
}
