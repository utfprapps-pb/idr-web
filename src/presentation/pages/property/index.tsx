import type { PropertyDetailsModel, PropertyModel } from '@/domain/models'
import { PageContainer } from '@/presentation/containers'

import type { PropertyPageProps } from './types'
import { usePropertyPage } from './useProperty'

export const PropertyPage: React.FC<PropertyPageProps> = ({
	getProperties
}) => {
	const {
		columns,
		isPropertiesLoading,
		properties,
		handleGetProperties,
		page,
		setPage,
		filters,
		setFilters,
		sort,
		setSort
	} = usePropertyPage({
		getProperties
	})

	return (
		<PageContainer<PropertyModel, PropertyDetailsModel>
			header={{
				title: 'Propriedades',
				description: 'Gerenciamento das propriedades dos produtores'
			}}
			tableContainer={{
				inputSearch: {
					value: filters.name,
					onChange: ({ target: { value } }) => {
						setFilters((prevState) => ({
							...prevState,
							name: value
						}))
					},
					placeholder: 'Procurar propriedades',
					debounce: 1000,
					debounceCallback: handleGetProperties
				},
				table: {
					columns,
					totalPages: properties.totalPages,
					data: properties.resources,
					pagination: {
						currentPage: page,
						onPageChange: setPage
					},
					sorting: {
						currentSorting: sort,
						onSorting: setSort
					},
					loading: isPropertiesLoading
				}
			}}
		/>
	)
}
