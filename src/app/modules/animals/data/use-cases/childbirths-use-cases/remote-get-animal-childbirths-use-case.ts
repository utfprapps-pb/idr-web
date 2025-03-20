import { format } from 'date-fns'

import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { ITEMS_PER_PAGE } from '@/core/infra/http'

import type { AnimalChildBirthModel } from '../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildBirthsUseCase } from '../../../domain/use-cases/animal-childbirths-use-cases'

export class RemoteGetAnimalChildBirthsUseCase
  implements GetAnimalChildBirthsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAnimalChildBirthsUseCase['execute'] = async ({
    propertyId,
    animalId,
    queryParams: { filters, pagination, sort },
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalId', animalId)

    const { statusCode, body } = await this.httpClient.request({
      url,
      method: 'get',
      filters,
      pagination,
      sort,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.animalChildBirths.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => {
            const condition = item.condition === 'ALIVE' ? 'Vivo' : 'Morto'
            const gender = item.gender === 'MALE' ? 'Macho' : 'Fêmea'

            return {
              id: item.id,
              breed: item.breed,
              condition,
              gender,
              date: format(new Date(item.date), 'dd/MM/yyyy'),
              weight: item.weight,
            } as AnimalChildBirthModel
          }
        ),
        totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Partos do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os partos do animal'
      )
    }

    throw new UnexpectedError()
  }
}
