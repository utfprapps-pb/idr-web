import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import {
  type ListApiResponse,
  type MapApiProperties,
} from '@/core/domain/types'
import { formatNumber } from '@/core/masker'

import {
  type ForageAvailabilityApiResponse,
  type ForageAvailabilityModel,
} from '../../../domain/models/forage-availability-model'
import { type GetForageAvailabilitiesUseCase } from '../../../domain/use-cases/forage-availability-use-cases'

export class RemoteGetForageAvailabilitiesUseCase
  implements GetForageAvailabilitiesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ForageAvailabilityModel,
      ForageAvailabilityApiResponse,
      ListApiResponse<ForageAvailabilityApiResponse[]>
    >
  ) {}

  execute: GetForageAvailabilitiesUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      ForageAvailabilityModel,
      ForageAvailabilityApiResponse
    > = {
      id: 'id',
      date: 'date',
      forage: 'forage',
      entranceCm: 'entranceCm',
      residueCm: 'residueCm',
      kgPerSquareMeter: 'kgPerSquareMeter',
      paddockArea: 'paddockArea',
      efficiencyPercent: 'efficiencyPercent',
      numberOfCows: 'numberOfCows',
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url.replace(':propertyId', propertyId.toString())}/search`,
      method: 'post',
      filters,
      pagination,
      sort,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => ({
          id: item.id,
          date: new Date(item.date),
          forage: item.forage,
          entranceCm: formatNumber(item.entranceCm, { suffix: 'cm' }),
          residueCm: formatNumber(item.residueCm, { suffix: 'cm' }),
          kgPerSquareMeter: formatNumber(item.kgPerSquareMeter, {
            suffix: 'kg/m²',
          }),
          paddockArea: formatNumber(item.paddockArea, { suffix: 'm²' }),
          efficiencyPercent: formatNumber(item.efficiencyPercent, {
            suffix: '%',
          }),
          numberOfCows: item.numberOfCows.toString(),
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Disponibilidade de Forragem')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as disponibilidades de forragem.'
      )
    }

    throw new UnexpectedError()
  }
}
