import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { ITEMS_PER_PAGE } from '@/core/infra/http'

import type { AnimalDiseaseModel } from '../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseasesUseCase } from '../../../domain/use-cases/animal-diseases-use-cases'

export class RemoteGetAnimalDiseasesUseCase
  implements GetAnimalDiseasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAnimalDiseasesUseCase['execute'] = async ({
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
        resources: body.animalDiseases.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => {
            return {
              id: item.id,
              diagnosticDate: new Date(item.diagnosticDate),
              diagnostic: item.diagnostic,
            } as AnimalDiseaseModel
          }
        ),
        totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doenças do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as doenças do animal'
      )
    }

    throw new UnexpectedError()
  }
}
