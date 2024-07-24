import { DeleteContainer } from '../deleteContainer'
import { SheetContainer } from '../sheetContainer'
import { TableContainer } from '../tableContainer'

import type { PageContainerProps } from './types'
import type { RowData } from '@tanstack/react-table'
import type { FieldValues } from 'react-hook-form'

export const PageContainer = <
	TData extends RowData & { id: string },
	TValues extends FieldValues
>({
	header,
	tableContainer,
	sheetContainer,
	deleteContainer
}: PageContainerProps<TData, TValues>) => (
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
				inputSearch={tableContainer.inputSearch}
				table={tableContainer.table}
			/>
		</main>

		<DeleteContainer {...deleteContainer} />
	</section>
)
