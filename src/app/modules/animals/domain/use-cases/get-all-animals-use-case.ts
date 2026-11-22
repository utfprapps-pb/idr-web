import type { AnimalModel } from '../models/animals-model'
import type { RequestInterface } from '@/core/domain/types'

/** Rebanho inteiro da propriedade (todas as páginas da busca). */
export type GetAllAnimalsUseCase = RequestInterface<
  { propertyId: string },
  AnimalModel[]
>
