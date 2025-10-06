import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { floatMask } from '@/core/masker'

import type {
  AnimalMedicationApiResponse,
  AnimalMedicationApplicationMethod,
  AnimalMedicationModel,
} from '../../../domain/models/animal-medications-model'
import type { GetAnimalMedicationsUseCase } from '../../../domain/use-cases/animal-medications-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalMedicationsUseCase
  implements GetAnimalMedicationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMedicationModel,
      AnimalMedicationApiResponse,
      ListApiResponse<AnimalMedicationModel[]>
    >
  ) {}

  execute: GetAnimalMedicationsUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalMedicationModel,
      AnimalMedicationApiResponse
    > = {
      id: 'id',
      date: 'date',
      product: 'product',
      appliedDose: 'appliedDose',
      activeIngredient: 'activeIngredient',
      applicationMethod: 'applicationMethod',
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
            id: item.id,
            date: new Date(item.date),
            product: item.product,
            appliedDose: floatMask(item.appliedDose, 'mg/ml'),
            activeIngredient: item.activeIngredient,
            applicationMethod:
              applicationMethodMapper[
                item.applicationMethod as AnimalMedicationApplicationMethod
              ],
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
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
