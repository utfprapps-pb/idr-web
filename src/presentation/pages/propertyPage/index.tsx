import { Button, Tabs } from '@/presentation/components/ui'
import { PageContainer } from '@/presentation/containers'

import { usePropertyPage } from './usePropertyPage'
import { usePropertyPageInputData } from './usePropertyPageInputData'

import type { PropertyPageProps } from './types'
import type { PropertyDetailsModel, PropertyModel } from '@/domain/models'

export const PropertyPage: React.FC<PropertyPageProps> = ({
	createProperty,
	updateProperty,
	deleteProperty,
	getProperties,
	getProperty,
	validation
}) => {
	const {
		isOpenSheet,
		setIsOpenSheet,
		isOpenDelete,
		setIsOpenDelete,
		activeTab,
		setActiveTab,
		form,
		propertyToDelete,
		propertyIdToUpdate,
		propertyToUpdate,
		columns,
		isPropertyDetailsLoading,
		isPropertiesLoading,
		properties,
		totalPages,
		page,
		setPage,
		sort,
		setSort,
		filters,
		setFilters,
		handleSubmit,
		handleDeleteProperty
	} = usePropertyPage({
		createProperty,
		updateProperty,
		deleteProperty,
		getProperties,
		getProperty,
		validation
	})

	const { generalInputData } = usePropertyPageInputData({
		form
	})

	return (
		<PageContainer<PropertyModel, PropertyDetailsModel>
			header={{
				title: 'Propriedades',
				description: 'Gerenciamento das propriedades dos produtores'
			}}
			deleteContainer={{
				open: isOpenDelete,
				onOpenChange: setIsOpenDelete,
				title: `Deseja remover a propriedade ${propertyToDelete?.name}`,
				description: 'Não será possível desfazer essa ação!',
				buttonCancel: {
					text: 'Cancelar'
				},
				buttonConfirm: {
					text: 'Remover',
					onClick: handleDeleteProperty
				}
			}}
			sheetContainer={{
				buttonAddText: 'Adicionar Propriedade',
				title: propertyIdToUpdate
					? `Atualizar Propriedade ${propertyToUpdate?.name}`
					: 'Nova Propriedade',
				description: `Preencha o formulário para ${propertyIdToUpdate ? 'atualizar a' : 'criar uma nova'} propriedade`,
				form,
				handleSubmit,
				open: isOpenSheet,
				onOpenChange: setIsOpenSheet,
				renderData: () => (
					<Tabs.Root defaultValue="general">
						<Tabs.List>
							<Tabs.Trigger
								value="general"
								onClick={() => setActiveTab('general')}
							>
								Dados Gerais
							</Tabs.Trigger>
							<Tabs.Trigger
								value="collaborators"
								onClick={() => setActiveTab('collaborators')}
							>
								Colaboradores
							</Tabs.Trigger>
							<Tabs.Trigger
								value="totalArea"
								onClick={() => setActiveTab('totalArea')}
							>
								Área Total
							</Tabs.Trigger>
							<Tabs.Trigger
								value="localization"
								onClick={() => setActiveTab('localization')}
							>
								Localização
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value={activeTab} className="flex flex-col gap-6">
							{generalInputData.map((component) => component)}
						</Tabs.Content>
					</Tabs.Root>
				),
				loading: form.formState.isLoading || isPropertyDetailsLoading,
				footerButtons: [
					{
						key: 'save',
						component: <Button type="submit">Salvar</Button>
					}
				]
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
					placeholder: 'Procurar propriedades'
				},
				table: {
					columns,
					totalPages,
					data: properties,
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
