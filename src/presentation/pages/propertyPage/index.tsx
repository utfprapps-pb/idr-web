import { Button, DataTable, Input } from '@/presentation/components/ui'

import { PropertyDeleteDialogContainer } from './containers/propertyDeleteDialogContaienr'
import { PropertySheetContainer } from './containers/propertySheetContainer'
import { usePropertyPage } from './usePropertyPage'

import type { PropertyPageProps } from './types'
import type { PropertyModel } from '@/domain/models'

export const PropertyPage: React.FC<PropertyPageProps> = ({
	createProperty,
	updateProperty,
	deleteProperty,
	getProperties,
	getProperty,
	getAllUsers
}) => {
	const {
		selectedProperty,
		setSelectedProperty,
		openDelete,
		setOpenDelete,
		openSheet,
		setOpenSheet,
		columns,
		isPropertiesLoading,
		properties,
		totalPages,
		page,
		setPage,
		sort,
		setSort,
		filters,
		setFilters
	} = usePropertyPage({
		getProperties
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

					<Button
						variant="default"
						type="button"
						onClick={() => {
							setOpenSheet(true)
							setSelectedProperty(undefined)
						}}
					>
						Adicionar Propriedade
					</Button>
				</div>
			</header>
			<main className="flex flex-col gap-4">
				<div className="self-start">
					<Input
						value={filters.name}
						onChange={({ target }) => {
							setFilters((prevState) => ({
								...prevState,
								name: target.value
							}))
						}}
						placeholder="Procurar propriedade"
					/>
				</div>
				<DataTable<PropertyModel>
					columns={columns}
					data={properties}
					totalPages={totalPages}
					pagination={{
						currentPage: page,
						onPageChange: setPage
					}}
					sorting={{
						currentSorting: sort,
						onSorting: setSort
					}}
					loading={isPropertiesLoading}
				/>
			</main>

			<PropertySheetContainer
				open={openSheet}
				onOpen={setOpenSheet}
				property={selectedProperty}
				createProperty={createProperty}
				updateProperty={updateProperty}
				getAllUsers={getAllUsers}
				getProperty={getProperty}
			/>

			<PropertyDeleteDialogContainer
				property={selectedProperty}
				open={openDelete}
				onOpen={setOpenDelete}
				deleteProperty={deleteProperty}
			/>
		</section>
	)
}
