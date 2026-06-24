import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'
import { unmaskFloat } from '@/core/masker'

import type { UpdatePropertyUseCase } from '../../domain/use-cases'

export class RemoteUpdatePropertyUseCase implements UpdatePropertyUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdatePropertyUseCase['execute'] = async ({ id, ...property }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'put',
      body: {
        name: property.general.name,
        latitude: unmaskFloat(property.localization.latitude),
        longitude: unmaskFloat(property.localization.longitude),
        nakedAveragePrice: unmaskFloat(
          property.general.nakedAveragePricePerHectare
        ),
        leaseAveragePrice: unmaskFloat(
          property.general.leaseAveragePricePerHectare
        ),
        dairyCattleFarming: unmaskFloat(property.totalArea.dairyCattleFarming),
        perennialPasture: unmaskFloat(property.totalArea.perennialPasture),
        summerPlowing: unmaskFloat(property.totalArea.summerPlowing),
        winterPlowing: unmaskFloat(property.totalArea.winterPlowing),
        producerId: property.general.producerId.value,
        cityId: property.general.cityId.value,
        technicianIds: property.general.responsibleTechnicians.map(
          (t) => t.value
        ),
        collaborators: property.collaborators.map((c) => ({
          name: c.name,
          hoursPerDay: c.hoursPerDay,
        })),
      },
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma propriedade'
      )
    }

    throw new UnexpectedError()
  }
}
