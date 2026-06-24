import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { floatMask, moneyMask } from '@/core/masker'

import type {
  PropertyDetailsApiResponse,
  PropertyDetailsModel,
} from '../../domain/models/properties-model'
import type { GetPropertyUseCase } from '../../domain/use-cases'

function toMoneyString(value: number): string {
  return moneyMask(String(Math.round(value * 100)))
}

function toFloatString(value: number): string {
  return floatMask(String(Math.round(value * 100)))
}

export class RemoteGetPropertyUseCase implements GetPropertyUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      PropertyDetailsModel,
      PropertyDetailsApiResponse
    >
  ) {}

  execute: GetPropertyUseCase['execute'] = async (id) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        general: {
          name: body.name,
          producerId: { label: body.producer.name, value: body.producer.id },
          cityId: { label: body.city.name, value: body.city.id },
          nakedAveragePricePerHectare: toMoneyString(body.nakedAveragePrice),
          leaseAveragePricePerHectare: toMoneyString(body.leaseAveragePrice),
          responsibleTechnicians: body.technicians.map((tech) => ({
            label: tech.name,
            value: tech.id,
          })),
        },
        collaborators: body.collaborators.map((c) => ({
          id: c.id,
          name: c.name,
          hoursPerDay: c.hoursPerDay,
        })),
        totalArea: {
          dairyCattleFarming: toFloatString(body.dairyCattleFarmingArea),
          perennialPasture: toFloatString(body.perennialPastureArea),
          summerPlowing: toFloatString(body.summerPlowingArea),
          winterPlowing: toFloatString(body.winterPlowingArea),
        },
        localization: {
          latitude: String(body.latitude),
          longitude: String(body.longitude),
          images: [],
        },
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Propriedades')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma propriedade'
      )
    }

    throw new UnexpectedError()
  }
}
