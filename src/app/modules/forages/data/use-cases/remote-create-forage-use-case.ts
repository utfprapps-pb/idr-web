import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateForageUseCase } from '../../domain/use-cases'

export class RemoteCreateForageUseCase implements CreateForageUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateForageUseCase['execute'] = async ({ propertyId, forage }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const body = {
      ...forage,

      cultivation:
        typeof forage.cultivation === 'object'
          ? forage.cultivation.label
          : forage.cultivation,

      area: forage.area ? Number(forage.area) : undefined,

      averageCost: forage.averageCost
        ? Number(
            String(forage.averageCost)
              .replace('R$', '') // remove símbolo
              .replace(/\./g, '') // remove separador de milhar (se houver)
              .replace(',', '.') // troca vírgula por ponto
              .trim()
          )
        : undefined,
        

      usefulLife: forage.usefulLife ? Number(forage.usefulLife) : undefined,
    }
    console.log('Payload enviado para API:', body)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova forrageira'
      )
    }

    throw new UnexpectedError()
  }
}
