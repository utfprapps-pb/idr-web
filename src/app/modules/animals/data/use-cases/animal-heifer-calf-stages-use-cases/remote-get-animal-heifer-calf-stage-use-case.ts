import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalHeiferCalfStageDetailsApiResponse,
  AnimalHeiferCalfStageDetailsModel,
  GMDStatus,
  ReproductionStatus,
} from '../../../domain/models/animal-heifer-calf-stages-model'
import type { GetAnimalHeiferCalfStageUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export class RemoteGetAnimalHeiferCalfStageUseCase
  implements GetAnimalHeiferCalfStageUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalHeiferCalfStageDetailsModel,
      AnimalHeiferCalfStageDetailsApiResponse
    >
  ) {}

  execute: GetAnimalHeiferCalfStageUseCase['execute'] = async ({
    id,
    animalId,
    propertyId,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        weighingDate: new Date(body.weighingDate),
        ecc: body.ecc,
        age: body.age,
        weighing: body.weighing,
        ageWeightEstimate: body.ageWeightEstimate,
        gmd: {
          ...body.gmd,
          status: body.gmd.status as GMDStatus,
        },
        amountOfMilk: body.amountOfMilk,
        weaningDate: {
          first: new Date(body.weaningDate.first),
          second: new Date(body.weaningDate.second),
        },
        removeLittleHouseDate: new Date(body.removeLittleHouseDate),
        amountOfEstimateConcentrate: body.amountOfEstimateConcentrate,
        bulky: body.bulky,
        dateToProvideSilage: new Date(body.dateToProvideSilage),
        reproduction: {
          ...body.reproduction,
          status: body.reproduction.status as ReproductionStatus,
          carriedOut: new Date(body.reproduction.carriedOut),
          fromDate: new Date(body.reproduction.fromDate),
        },
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Fase bezerra novilha')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma fase bezerra novilha'
      )
    }

    throw new UnexpectedError()
  }
}
