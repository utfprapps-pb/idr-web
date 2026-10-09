import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../mappers/animal-breed-mapper'

import type { AnimalDetailsModel } from '../../domain/models/animals-model'
import type { GetAnimalUseCase } from '../../domain/use-cases'
import type { Option } from '@/core/domain/types'

/** Formato real do `GetAnimalByIdOutput`: `breedId` plano, sem objeto `breed` aninhado. */
export type AnimalGetApiResponse = {
  id: string
  identifier: string
  breedId: number
  currentWeight: number | null
  ecc: number | null
}

export class RemoteGetAnimalUseCase implements GetAnimalUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDetailsModel,
      AnimalGetApiResponse
    >
  ) {}

  execute: GetAnimalUseCase['execute'] = async (
    { animalId, propertyId },
    breeds
  ) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${animalId}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.identifier,
        breed: fromApi(
          body.breedId,
          Array.isArray(breeds) ? (breeds as Option<number>[]) : []
        ),
        ecc: body.ecc != null ? String(body.ecc) : '',
        weight: body.currentWeight != null ? String(body.currentWeight) : '',
        milkProduction: '',
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar um animal')
    }

    throw new UnexpectedError()
  }
}
