import type { PropertyDetailsModel } from '@/domain/models/propertyModel'
import type { IRequestInterface } from '@/domain/shared/types'

export interface ICreateProperty
	extends IRequestInterface<PropertyDetailsModel, void> {}
