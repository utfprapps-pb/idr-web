import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { PropertyModel } from '@/domain/models'
import { DropdownMenu } from '@/presentation/components/ui'
import { pageContainerHook } from '@/presentation/hooks/usePageContainer'

export const usePropertyPage = pageContainerHook<
	PropertyModel,
	keyof PropertyModel
>({
	listTableParams: {
		columns: [
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
			} as ColumnDef<PropertyModel>
		]
	}
})
