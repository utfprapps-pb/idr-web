import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState
} from 'react'

import { IGetAllUsers } from '@/domain/useCases/user'

import type { PropertyModel } from '@/domain/models/propertyModel'
import type {
	ICreateProperty,
	IDeleteProperty,
	IGetProperties,
	IGetProperty,
	IUpdateProperty
} from '@/domain/useCases/property'

type Services = {
	getProperties: IGetProperties
	deleteProperty: IDeleteProperty
	createProperty: ICreateProperty
	updateProperty: IUpdateProperty
	getProperty: IGetProperty
	getAllUsers: IGetAllUsers
}

type PropertyContextValue = Services & {
	propertySelected: null | PropertyModel
	isOpenNewPropertyForm: boolean
	isOpenEditPropertyForm: boolean
	isOpenDeletePropertyContainer: boolean
	openNewPropertyForm: () => void
	closeNewPropertyForm: () => void
	openEditPropertyForm: (property: PropertyModel) => void
	closeEditPropertyForm: () => void
	openDeletePropertyContainer: (property: PropertyModel) => void
	closeDeletePropertyContainer: () => void
}

type PropertyProviderProps = Services

export const PropertyContext = createContext({} as PropertyContextValue)

export const PropertyProvider: React.FC<
	PropsWithChildren<PropertyProviderProps>
> = ({
	children,
	getProperties,
	deleteProperty,
	createProperty,
	updateProperty,
	getProperty,
	getAllUsers
}) => {
	const [isOpenNewPropertyForm, setIsOpenNewPropertyForm] = useState(false)

	const [isOpenEditPropertyForm, setIsOpenEditPropertyForm] = useState(false)

	const [isOpenDeletePropertyContainer, setIsOpenDeletePropertyContainer] =
		useState(false)

	const [propertySelected, setPropertySelected] =
		useState<null | PropertyModel>(null)

	const openNewPropertyForm = useCallback(() => {
		setIsOpenNewPropertyForm(true)
	}, [])

	const closeNewPropertyForm = useCallback(() => {
		setIsOpenNewPropertyForm(false)
	}, [])

	const openEditPropertyForm = useCallback((property: PropertyModel) => {
		setPropertySelected(property)
		setIsOpenEditPropertyForm(true)
	}, [])

	const closeEditPropertyForm = useCallback(() => {
		setPropertySelected(null)
		setIsOpenEditPropertyForm(false)
	}, [])

	const openDeletePropertyContainer = useCallback((property: PropertyModel) => {
		setPropertySelected(property)
		setIsOpenDeletePropertyContainer(true)
	}, [])

	const closeDeletePropertyContainer = useCallback(() => {
		setPropertySelected(null)
		setIsOpenDeletePropertyContainer(false)
	}, [])

	const providerValues = useMemo(
		() => ({
			getProperties,
			createProperty,
			updateProperty,
			getProperty,
			getAllUsers,
			deleteProperty,
			propertySelected,
			isOpenNewPropertyForm,
			isOpenEditPropertyForm,
			isOpenDeletePropertyContainer,
			openNewPropertyForm,
			closeNewPropertyForm,
			openEditPropertyForm,
			closeEditPropertyForm,
			openDeletePropertyContainer,
			closeDeletePropertyContainer
		}),
		[
			getProperties,
			deleteProperty,
			createProperty,
			updateProperty,
			getProperty,
			getAllUsers,
			propertySelected,
			isOpenNewPropertyForm,
			isOpenEditPropertyForm,
			isOpenDeletePropertyContainer,
			openNewPropertyForm,
			closeNewPropertyForm,
			openEditPropertyForm,
			closeEditPropertyForm,
			openDeletePropertyContainer,
			closeDeletePropertyContainer
		]
	)

	return (
		<PropertyContext.Provider value={providerValues}>
			{children}
		</PropertyContext.Provider>
	)
}

export const usePropertyContext = () => useContext(PropertyContext)
