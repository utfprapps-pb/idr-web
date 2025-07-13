import { CustomParams } from '@/core/domain/types/list-custom-params-type'
import type { AnimalDetailsModel } from '../models/animals-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
  },
  AnimalDetailsModel,
  CustomParams
>
