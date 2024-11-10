import type { PropertyDetailsModel } from '@/domain/models/propertyModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type ICreateProperty = IRequestInterface<PropertyDetailsModel, void>
