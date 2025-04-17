import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { ITEMS_PER_PAGE } from '@/core/infra/http'

import type { AnimalHeiferCalfStageModel } from '../../../domain/models/animal-heifer-calf-stages-model'
import type { GetAnimalHeiferCalfStagesUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export class RemoteGetAnimalHeiferCalfStagesUseCase
  implements GetAnimalHeiferCalfStagesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAnimalHeiferCalfStagesUseCase['execute'] = async ({
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
        resources: body.animalHeiferCalfStages.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => {
            return {
              id: item.id,
              weighingDate: new Date(item.weighingDate),
              weight: item.weight,
              ecc: item.ecc,
              age: item.age,
            } as AnimalHeiferCalfStageModel
          }
        ),
        totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Fases bezerra novilha')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as fases bezerra novilha'
      )
    }

    throw new UnexpectedError()
  }
}
