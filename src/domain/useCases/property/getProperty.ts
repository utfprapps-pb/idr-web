import type { PropertyDetailsModel } from '@/domain/models/propertyModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetProperty = IRequestInterface<string, PropertyDetailsModel>
