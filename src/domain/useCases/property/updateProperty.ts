import { PropertyDetailsModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'

export interface IUpdateProperty
	extends IRequestInterface<PropertyDetailsModel, void> {}
