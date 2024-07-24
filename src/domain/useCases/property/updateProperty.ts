import type { PropertyDetailsModel } from '@/domain/models'
import type { IRequestInterface } from '@/domain/shared/types'

export interface IUpdateProperty
	extends IRequestInterface<{ id: string } & PropertyDetailsModel, void> {}
