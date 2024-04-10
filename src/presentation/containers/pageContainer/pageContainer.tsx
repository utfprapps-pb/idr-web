import { RowData } from '@tanstack/react-table'

import { Button } from '@/presentation/components/ui'

import { TableContainer } from '../tableContainer'

import type { PageContainerProps } from './types'

export const PageContainer = <TData extends RowData>({
	header,
	tableContainer
}: PageContainerProps<TData>) => (
	<section className="flex flex-col gap-11">
		<header>
			<div className="flex justify-between items-center">
				<div className="flex flex-col gap-2">
					<span className="text-3xl text-slate-900 font-semibold">
						{header.title}
					</span>
					<p className="text-base text-slate-600">{header.description}</p>
				</div>

				<Button variant="default">{header.buttonAddText}</Button>
			</div>
		</header>
		<main className="flex flex-col gap-4">
			<TableContainer
				inputSearch={{
					...tableContainer.inputSearch
				}}
				table={{
					...tableContainer.table
				}}
			/>
		</main>
	</section>
)
