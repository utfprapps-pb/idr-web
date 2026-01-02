import type { AnimalModel } from '../models/animals-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAllAnimalsUseCase = RequestInterface<
  { propertyId: number },
  AnimalModel[]
>
