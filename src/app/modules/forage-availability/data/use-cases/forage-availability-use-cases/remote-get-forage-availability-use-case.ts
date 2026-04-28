import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'
import { formatNumber } from '@/core/masker'

import {
  type ForageAvailabilityDetailsApiResponse,
  type ForageAvailabilityDetailsModel,
} from '../../../domain/models/forage-availability-model'
import { type GetForageAvailabilityUseCase } from '../../../domain/use-cases/forage-availability-use-cases'

export class RemoteGetForageAvailabilityUseCase
  implements GetForageAvailabilityUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ForageAvailabilityDetailsModel,
      ForageAvailabilityDetailsApiResponse
    >
  ) {}

  execute: GetForageAvailabilityUseCase['execute'] = async ({
    propertyId,
    id,
  }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url.replace(':propertyId', propertyId.toString())}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body)
      return {
        date: new Date(body.date),
        forage: body.forage,
        entranceCm: formatNumber(body.entranceCm, { suffix: 'cm' }),
        residueCm: formatNumber(body.residueCm, { suffix: 'cm' }),
        kgPerSquareMeter: formatNumber(body.kgPerSquareMeter, {
          suffix: 'kg/m²',
        }),
        paddockArea: formatNumber(body.paddockArea, { suffix: 'm²' }),
        efficiencyPercent: formatNumber(body.efficiencyPercent, {
          suffix: '%',
        }),
        numberOfCows: body.numberOfCows.toString(),
      }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Disponibilidade de Forragem')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para acessar os dados desta disponibilidade de forragem.'
      )
    }

    throw new UnexpectedError()
  }
}
