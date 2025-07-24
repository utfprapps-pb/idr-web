import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalPregnancyDiagnosisModel,
  AnimalPregnancyDiagnosisApiResponse,
} from '../../../domain/models/animal-pregnancy-diagnoses-model'
import type { GetAnimalPregnancyDiagnosesUseCase } from '../../../domain/use-cases/animal-pregnancy-diagnoses-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalPregnancyDiagnosesUseCase
  implements GetAnimalPregnancyDiagnosesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalPregnancyDiagnosisModel,
      AnimalPregnancyDiagnosisApiResponse,
      ListApiResponse<AnimalPregnancyDiagnosisModel[]>
    >
  ) {}

  execute: GetAnimalPregnancyDiagnosesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalPregnancyDiagnosisModel,
      AnimalPregnancyDiagnosisApiResponse
    > = {
      id: 'id',
      date: 'date',
      lastInseminationDate: 'lastInseminationDate',
    }

    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search`,
      method: 'post',
      filters,
      pagination,
      sort,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => {
          return {
            id: item.id,
            date: new Date(item.date),
            lastInseminationDate: new Date(item.lastInseminationDate),
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Diagnósticos de Gestação do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os diagnósticos de gestação do animal'
      )
    }

    throw new UnexpectedError()
  }
}
