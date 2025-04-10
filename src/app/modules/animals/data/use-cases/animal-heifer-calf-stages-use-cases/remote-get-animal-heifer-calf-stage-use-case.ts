import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { AnimalHeiferCalfStageDetailsModel } from '../../../domain/models/animal-heifer-calf-stages-model'
import type { GetAnimalHeiferCalfStageUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export class RemoteGetAnimalHeiferCalfStageUseCase
  implements GetAnimalHeiferCalfStageUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAnimalHeiferCalfStageUseCase['execute'] = async ({
    id,
    animalId,
    propertyId,
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalId', animalId)

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
        gmd: body.gmd,
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
          carriedOut: new Date(body.reproduction.carriedOut),
          fromDate: new Date(body.reproduction.fromDate),
        },
      } as AnimalHeiferCalfStageDetailsModel
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
