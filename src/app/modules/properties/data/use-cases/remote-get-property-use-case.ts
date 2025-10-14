import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  PropertyDetailsApiResponse,
  PropertyDetailsModel,
} from '../../domain/models/properties-model'
import type { GetPropertyUseCase } from '../../domain/use-cases'

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
          producer: body.farmer,
          city: body.city,
          state: body.state,
          nakedAveragePricePerHectare: body.nakedAveragePrice.toFixed(2),
          leaseAveragePricePerHectare: body.leaseAveragePrice.toFixed(2),
          responsibleTechnicians: body.technicians.map((technician) => ({
            value: technician.id,
            label: technician.user.displayName,
          })),
        },
        collaborators: body.collaborators.map((collaborator) => ({
          id: collaborator.id,
          name: collaborator.collaboratorName,
          hoursPerDay: String(collaborator.workHours),
        })),
        totalArea: {
          dairyCattleFarming: body.area.dairyCattleFarming.toFixed(2),
          perennialPasture: body.area.perennialPasture.toFixed(2),
          summerPlowing: body.area.summerPlowing.toFixed(2),
          winterPlowing: body.area.winterPlowing.toFixed(2),
        },

        localization: {
          latitude: String(body.latitude),
          longitude: String(body.longitude),
          images:
            body.attachment?.map((image: string) => ({
              preview: image,
            })) ?? null,
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
