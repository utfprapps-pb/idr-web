import { Input, DataTable } from '@/presentation/components/ui'

import { usePropertiesDataTable } from './usePropertiesDataTable'

import type { PropertyModel } from '@/domain/models/propertyModel'

export const PropertiesDataTable: React.FC = () => {
	const {
		columns,
		properties,
		isLoading,
		filters,
		page,
		sort,
		setFilters,
		setSort,
		setPage,
	} = usePropertiesDataTable()

	return (
		<div className="flex flex-col gap-4">
			<Input
				value={filters.name}
				onChange={({ target }) => {
					setFilters((prevState) => ({
						...prevState,
						name: target.value,
					}))
				}}
				placeholder="Procurar propriedade"
			/>

			<DataTable<PropertyModel>
				columns={columns}
				data={properties.resources}
				totalPages={properties.totalPages}
				pagination={{
					currentPage: page,
					onPageChange: setPage,
				}}
				sorting={{
					currentSorting: sort,
					onSorting: setSort,
				}}
				loading={isLoading}
			/>
		</div>
	)
}
