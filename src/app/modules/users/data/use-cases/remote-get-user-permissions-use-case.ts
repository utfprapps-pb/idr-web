import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { GetUserPermissionsUseCase } from '../../domain/use-cases'
import type { UserRole } from '@/core/domain/models/users-model'

type UserPermissionItem = {
  id: string
  role: string
  readOnly: boolean
  regionIds: string[]
  cityIds: string[]
}

type UserPermissionsApiResponse = {
  userId: string
  permissions: UserPermissionItem[]
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
      const permission = body.permissions?.[0]

      return {
        role: (permission?.role as UserRole) ?? 'TECNICO',
        readOnly: permission?.readOnly ?? false,
        regionIds: permission?.regionIds ?? [],
        cityIds: permission?.cityIds ?? [],
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Usuário')
    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    throw new UnexpectedError()
  }
}
