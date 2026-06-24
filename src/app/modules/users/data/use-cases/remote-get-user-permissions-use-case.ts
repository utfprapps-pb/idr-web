import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { GetUserPermissionsUseCase } from '../../domain/use-cases'
import type { UserRole } from '@/core/domain/models/users-model'

type UserPermissionsApiResponse = {
  role: string
  readOnly: boolean
  regionIds: string[]
  cityIds: string[]
}

export class RemoteGetUserPermissionsUseCase
  implements GetUserPermissionsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      unknown,
      unknown,
      UserPermissionsApiResponse
    >
  ) {}

  execute: GetUserPermissionsUseCase['execute'] = async ({ userId }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url.replace(':userId', userId),
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        role: body.role as UserRole,
        readOnly: body.readOnly,
        regionIds: body.regionIds ?? [],
        cityIds: body.cityIds ?? [],
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Usuário')
    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    throw new UnexpectedError()
  }
}
