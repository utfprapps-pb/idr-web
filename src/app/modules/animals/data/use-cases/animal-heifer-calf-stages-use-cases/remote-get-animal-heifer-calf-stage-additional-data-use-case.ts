import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalHeiferCalfStageAdditionalDataApiResponse,
  AnimalHeiferCalfStageAdditionalDataModel,
  GMDStatus,
  ReproductionStatus,
} from '../../../domain/models/animal-heifer-calf-stages-model'
import type { GetAnimalHeiferCalfStageAdditionalDataUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export class RemoteGetAnimalHeiferCalfStageAdditionalDataUseCase
  implements GetAnimalHeiferCalfStageAdditionalDataUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalHeiferCalfStageAdditionalDataModel,
      AnimalHeiferCalfStageAdditionalDataApiResponse
    >
  ) {}

  execute: GetAnimalHeiferCalfStageAdditionalDataUseCase['execute'] = async ({
    animalId,
    propertyId,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
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
      throw new NotFoundError('Dados adicionais de Fase bezerra novilha')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os dados adicionais de uma fase bezerra novilha'
      )
    }

    throw new UnexpectedError()
  }
}
