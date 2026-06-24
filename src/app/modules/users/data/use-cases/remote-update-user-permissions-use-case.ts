import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateUserPermissionsUseCase } from '../../domain/use-cases'

export class RemoteUpdateUserPermissionsUseCase
  implements UpdateUserPermissionsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateUserPermissionsUseCase['execute'] = async ({
    userId,
    name,
    username,
    role,
    readOnly,
    regionIds,
    cityIds,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url.replace(':userId', userId),
      method: 'put',
      body: { name, username, role, readOnly, regionIds, cityIds },
    })

    if (
      statusCode === HttpStatusCode.ok ||
      statusCode === HttpStatusCode.noContent
    )
      return

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Usuário')
    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()
    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
