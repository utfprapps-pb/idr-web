import type { PropertyDetailsModel } from '../models/properties-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreatePropertyUseCase = RequestInterface<PropertyDetailsModel, void>
