import { useState } from 'react'

import { DataTable, type DataTableProps } from '.'

import type { Sort } from '@/domain/shared/types'
import type { Meta, StoryFn } from '@storybook/react/'
import type { ColumnDef } from '@tanstack/react-table'

type Payment = {
	id: string
	amount: number
	status: 'pending' | 'processing' | 'success' | 'failed'
	email: string
}

const StatusMapping: { [key in Payment['status']]: string } = {
	failed: 'Falhou',
	pending: 'Pendente',
	processing: 'Processando',
	success: 'Sucesso'
}

const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ getValue }) => {
			const value = getValue() as Payment['status']
			return StatusMapping[value]
		}
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'amount',
		header: 'Quantidade'
	}
]

const payments: Payment[] = [
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'm@example.com'
	},
	{
		id: '489e1d42',
		amount: 125,
		status: 'processing',
		email: 'example@gmail.com'
	}
]

export default {
	title: 'Components/UI/DataTable'
} as Meta

const Template: StoryFn<DataTableProps<Payment>> = (args) => {
	const [sorting, setSorting] = useState<Sort<keyof Payment>>({
		direction: 'asc',
		field: 'id'
	})
	const [pagination, setPagination] = useState<number>(1)

	return (
		<div className="flex flex-col gap-12">
			<DataTable
				{...args}
				sorting={{
					currentSorting: sorting,
					onSorting: setSorting
				}}
				pagination={{
					currentPage: pagination,
					onPageChange: setPagination
				}}
			/>
			<p>Sorting State: {JSON.stringify(sorting, null, 2)}</p>
			<p>Pagination State: {JSON.stringify(pagination, null, 2)}</p>
		</div>
	)
}

export const Default = Template.bind({})
Default.args = {
	columns,
	data: payments
}
