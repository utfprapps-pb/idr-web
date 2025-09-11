import type { AnimalDetailsModel } from '../models/animals-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalUseCase = RequestInterface<
  { propertyId: number; animal: AnimalDetailsModel },
  void
>
