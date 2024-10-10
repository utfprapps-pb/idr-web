import { IGetAllUsers } from '@/domain/useCases/user'

import type { PropertyModel } from '@/domain/models/propertyModel'
import type { Filters, Sort } from '@/domain/shared/types'
import type {
	ICreateProperty,
	IDeleteProperty,
	IGetProperties,
	IGetProperty,
	IUpdateProperty,
} from '@/domain/useCases//property'

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

export type PropertyFilters = Partial<Filters<keyof PropertyModel>>
export type PropertySort = Sort<keyof PropertyModel>
