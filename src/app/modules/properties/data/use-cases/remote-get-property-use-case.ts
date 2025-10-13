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
        id: body.id,
        general: {
          name: body.name,
          producer: body.farmer,
          city: body.city,
          state: body.state,
          nakedAveragePricePerHectare: String(body.nakedAveragePrice),
          leaseAveragePricePerHectare: String(body.leaseAveragePrice),
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
          dairyCattleFarming: String(body.area.dairyCattleFarming),
          perennialPasture: String(body.area.perennialPasture),
          summerPlowing: String(body.area.summerPlowing),
          winterPlowing: String(body.area.winterPlowing),
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
