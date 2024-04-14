import { PropertyDetailsModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'

export interface ICreateProperty
	extends IRequestInterface<PropertyDetailsModel, void> {}
