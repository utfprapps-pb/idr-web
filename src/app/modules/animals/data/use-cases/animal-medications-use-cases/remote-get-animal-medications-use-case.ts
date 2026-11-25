import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { floatMask } from '@/core/masker'

import { fromApi } from '../../mappers/animal-medication-api-mapper'

import type {
  AnimalMedicationApplicationMethod,
  AnimalMedicationModel,
  AnimalMedicationApiResponse,
} from '../../../domain/models/animal-medications-model'
import type { GetAnimalMedicationsUseCase } from '../../../domain/use-cases/animal-medications-use-cases'
import type { MapApiProperties, SearchApiResponse } from '@/core/domain/types'

/**
 * Coluna da tabela -> campo da entidade na API (o `sort` do Spring usa o nome
 * da entidade). Coluna fora do mapa não envia `sort`.
 */
const SORT_FIELD_MAP: MapApiProperties<
  AnimalMedicationModel,
  AnimalMedicationApiResponse
> = {
  date: 'applicationDate',
  product: 'productName',
  activeIngredient: 'activePrinciple',
  appliedDose: 'appliedDose',
  applicationMethod: 'applicationWay',
}

export class RemoteGetAnimalMedicationsUseCase
  implements GetAnimalMedicationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMedicationModel,
      AnimalMedicationApiResponse,
      SearchApiResponse<AnimalMedicationApiResponse>
    >
  ) {}

  execute: GetAnimalMedicationsUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const query = buildSearchQuery(
      { filters, pagination, sort },
      (field) => SORT_FIELD_MAP[field as keyof AnimalMedicationModel]
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      const applicationMethodMapper: Record<
        AnimalMedicationApplicationMethod,
        string
      > = {
        IM: 'IM',
        IV: 'IV',
        SC: 'SC',
        IntraMammary: 'Intra Mamária',
        PourOn: 'Pour On',
      }

      return {
        resources: body.items.map((item) => {
          const record = fromApi(item)
          return {
            id: item.id,
            date: record.date,
            product: item.productName,
            appliedDose: floatMask(record.appliedDose, 'mg/ml'),
            activeIngredient: item.activePrinciple ?? '',
            applicationMethod:
              applicationMethodMapper[record.applicationMethod],
          }
        }),
        totalPages: toTotalPages(body),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Medicações do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as medicações deste animal'
      )
    }

    throw new UnexpectedError()
  }
}
