import { CreatePropertyModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'

export interface ICreateProperty
	extends IRequestInterface<CreatePropertyModel, void> {}
