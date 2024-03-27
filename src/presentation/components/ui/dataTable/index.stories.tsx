import { Meta, StoryFn } from '@storybook/react/'
import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from './dataTable'
import { DataTableProps } from './types'

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

const Template: StoryFn<DataTableProps<Payment>> = (args) => (
	<DataTable {...args} />
)

export const Default = Template.bind({})
Default.args = {
	columns,
	data: payments
}
