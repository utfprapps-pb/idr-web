import type {
	ICreateProperty,
	IDeleteProperty,
	IGetAllUsers,
	IGetProperties,
	IGetProperty,
	IUpdateProperty
} from '@/domain/useCases'
import type { IValidation } from '@/presentation/protocols'

export type PropertyPageProps = {
	createProperty: ICreateProperty
	updateProperty: IUpdateProperty
	deleteProperty: IDeleteProperty
	getProperties: IGetProperties
	getProperty: IGetProperty
	getAllUsers: IGetAllUsers
	validation: IValidation
}
