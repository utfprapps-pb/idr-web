import { useMemo } from 'react'

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { DropdownMenu } from '@/presentation/components/ui'

import { SheetContainer } from '../sheetContainer'
import { TableContainer } from '../tableContainer'

import type { PageContainerProps } from './types'
import type { ColumnDef, RowData } from '@tanstack/react-table'
import type { FieldValues } from 'react-hook-form'

export const PageContainer = <
	TData extends RowData & { id: string },
	TValues extends FieldValues
>({
	header,
	tableContainer,
	sheetContainer,
	openUpdateSheetContainer
}: PageContainerProps<TData, TValues>) => {
	const { columns } = tableContainer.table

	const columnsWithActions = useMemo<ColumnDef<TData>[]>(
		() => [
			...columns,
			{
				id: 'row-actions',
				header: '',
				cell: ({ row }) => {
					const { id } = row.original

					return (
						<DropdownMenu.Root key={id}>
							<DropdownMenu.Trigger>
								<MoreHorizontal />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item
									className="gap-2"
									onClick={() => openUpdateSheetContainer(id)}
								>
									<Pencil size={14} /> Editar
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item className="gap-2">
									<Trash2 size={14} /> Excluir
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					)
				}
			}
		],
		[columns, openUpdateSheetContainer]
	)

	return (
		<section className="flex flex-col gap-11">
			<header>
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-2">
						<span className="text-3xl text-slate-900 font-semibold">
							{header.title}
						</span>
						<p className="text-base text-slate-600">{header.description}</p>
					</div>

					<SheetContainer
						open={sheetContainer.open}
						onOpenChange={sheetContainer.onOpenChange}
						buttonAddText={sheetContainer.buttonAddText}
						title={sheetContainer.title}
						description={sheetContainer.description}
						loading={sheetContainer.loading}
						form={sheetContainer.form}
						renderData={sheetContainer.renderData}
						handleSubmit={sheetContainer.handleSubmit}
						footerButtons={sheetContainer.footerButtons}
					/>
				</div>
			</header>
			<main className="flex flex-col gap-4">
				<TableContainer
					inputSearch={{
						...tableContainer.inputSearch
					}}
					table={{
						...tableContainer.table,
						columns: columnsWithActions
					}}
				/>
			</main>
		</section>
	)
}
