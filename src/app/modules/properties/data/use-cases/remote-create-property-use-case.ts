import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'
import { onlyNumbersMask } from '@/core/masker'

import type {
  PropertyDetailsApiResponse,
  PropertyDetailsModel,
} from '../../domain/models/properties-model'
import type { CreatePropertyUseCase } from '../../domain/use-cases'

export class RemoteCreatePropertyUseCase implements CreatePropertyUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      PropertyDetailsModel,
      PropertyDetailsApiResponse
    >
  ) {}

  execute: CreatePropertyUseCase['execute'] = async (property) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}`,
      method: 'post',
      body: {
        name: property.general.name,
        city: property.general.city,
        state: property.general.state,
        farmer: property.general.producer,
        nakedAveragePrice: Number(
          onlyNumbersMask(property.general.nakedAveragePricePerHectare)
        ),
        leaseAveragePrice: Number(
          onlyNumbersMask(property.general.leaseAveragePricePerHectare)
        ),
        technicians: property.general.responsibleTechnicians.map(
          (technician) => ({
            id: technician.value,
            user: {
              displayName: technician.label,
            },
          })
        ),
        area: {
          dairyCattleFarming: Number(
            onlyNumbersMask(property.totalArea.dairyCattleFarming)
          ),
          perennialPasture: Number(
            onlyNumbersMask(property.totalArea.perennialPasture)
          ),
          summerPlowing: Number(
            onlyNumbersMask(property.totalArea.summerPlowing)
          ),
          winterPlowing: Number(
            onlyNumbersMask(property.totalArea.winterPlowing)
          ),
        },
        collaborators: property.collaborators.map((collaborator) => ({
          collaboratorName: collaborator.name,
          workDays: 7, // todo: não temos esse campo no front
          workHours: Number(onlyNumbersMask(collaborator.hoursPerDay)),
        })),
        latitude: Number(onlyNumbersMask(property.localization.latitude)),
        longitude: Number(onlyNumbersMask(property.localization.longitude)),
        // todo: falta validar o type
        attachment: null,
      },
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova propriedade'
      )
    }

    throw new UnexpectedError()
  }
}
