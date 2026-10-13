import type { PropertyDetailsModel } from '../models/properties-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetPropertyUseCase = RequestInterface<string, PropertyDetailsModel>
