import type { PropertyDetailsModel } from '@/domain/models/propertyModel'
import type { IRequestInterface } from '@/domain/shared/types'
import type { WithId } from '@/domain/shared/types/withId'

export interface IUpdateProperty
	extends IRequestInterface<WithId<PropertyDetailsModel>, void> {}
