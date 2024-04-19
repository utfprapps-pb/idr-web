import { PropertyDetailsModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'

export interface IGetProperty
	extends IRequestInterface<string, PropertyDetailsModel> {}
