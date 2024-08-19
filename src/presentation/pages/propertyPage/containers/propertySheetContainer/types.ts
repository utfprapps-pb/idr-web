import { z } from 'zod'

import { propertySchema } from './validation'

import type { PropertyModel } from '@/domain/models'
import type {
	ICreateProperty,
	IGetAllUsers,
	IGetProperty,
	IUpdateProperty
} from '@/domain/useCases'

export type PropertySheetContainerProps = {
	open: boolean
	onOpen: (open: boolean) => void
	property?: PropertyModel
	createProperty: ICreateProperty
	updateProperty: IUpdateProperty
	getProperty: IGetProperty
	getAllUsers: IGetAllUsers
}

export type PropertySchema = z.infer<typeof propertySchema>
