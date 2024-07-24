import type { PropertyDetailsModel } from '@/domain/models'
import type { IRequestInterface } from '@/domain/shared/types'

export interface IGetProperty
	extends IRequestInterface<string, PropertyDetailsModel> {}
