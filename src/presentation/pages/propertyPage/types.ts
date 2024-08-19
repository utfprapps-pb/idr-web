import type {
	ICreateProperty,
	IDeleteProperty,
	IGetAllUsers,
	IGetProperties,
	IGetProperty,
	IUpdateProperty
} from '@/domain/useCases'

export type PropertyPageProps = {
	createProperty: ICreateProperty
	updateProperty: IUpdateProperty
	deleteProperty: IDeleteProperty
	getProperties: IGetProperties
	getProperty: IGetProperty
	getAllUsers: IGetAllUsers
}

export type UsePropertyPageProps = {
	getProperties: IGetProperties
}
