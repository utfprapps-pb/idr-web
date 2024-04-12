import { PageContainer } from '@/presentation/containers'

import { PropertyPageProps } from './types'
import { usePropertyPage } from './useProperty'

export const PropertyPage: React.FC<PropertyPageProps> = ({
	getProperties
}) => {
	const {
		columns,
		pagination,
		sorting,
		loading,
		totalPages,
		filters,
		setFilters,
		data: properties,
		handleGetData: handleGetProperties
	} = usePropertyPage({
		useListTableParams: {
			getData: getProperties
		}
	})

	return (
		<PageContainer
			header={{
				title: 'Propriedades',
				description: 'Gerenciamento das propriedades dos produtores',
				buttonAddText: 'Adicionar Propriedade'
			}}
			tableContainer={{
				inputSearch: {
					value: filters?.name ?? '',
					onChange: ({ target: { value } }) => {
						setFilters((prevState) => ({
							...prevState,
							name: value
						}))
					},
					placeholder: 'Procurar propriedades',
					debounce: 1000,
					debounceCallback: () => handleGetProperties({ filters })
				},
				table: {
					columns,
					totalPages,
					data: properties,
					pagination,
					sorting,
					loading
				}
			}}
		/>
	)
}
