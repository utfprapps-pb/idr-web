import { useState } from 'react'

import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button, DropdownMenu } from '@/presentation/components/ui'

import { TableContainer } from '../tableContainer'

type Property = {
	id: string
	producer: string
	name: string
	county: {
		city: string
		state: string
	}
}

export const PageContainer: React.FC = () => {
	const columns: ColumnDef<Property>[] = [
		{
			accessorKey: 'producer',
			header: 'Produtor'
		},
		{
			accessorKey: 'name',
			header: 'Propriedade'
		},
		{
			accessorKey: 'county',
			header: 'Município',
			accessorFn: ({ county }) => `${county.city} - ${county.state}`
		},
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
							<DropdownMenu.Item className="gap-2">
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
	]

	const data: Property[] = Array.from({ length: 60 }, (_, index) => ({
		id: (index + 1).toString(),
		producer: `Producer ${index + 1}`,
		name: `Property ${index + 1}`,
		county: {
			city: 'Pato Branco',
			state: 'PR'
		}
	}))

	const [sorting, setSorting] = useState<SortingState>([])
	const [page, setPage] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 0
	})

	return (
		<section className="flex flex-col gap-11">
			<header>
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-2">
						<span className="text-3xl text-slate-900 font-semibold">
							Propriedades
						</span>
						<p className="text-base text-slate-600">
							Gerenciamento das propriedades dos produtores
						</p>
					</div>

					<Button variant="default">Adicionar Propriedade</Button>
				</div>
			</header>
			<main className="flex flex-col gap-4">
				<TableContainer
					inputSearch={{
						placeholder: 'Procurar propriedades'
					}}
					table={{
						columns,
						data,
						sorting: {
							currentSorting: sorting,
							onSorting: setSorting
						},
						pagination: {
							currentPage: page,
							onPageChange: setPage
						}
					}}
				/>
			</main>
		</section>
	)
}
