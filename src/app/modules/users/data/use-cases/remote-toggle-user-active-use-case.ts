import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { ToggleUserActiveUseCase } from '../../domain/use-cases'

export class RemoteToggleUserActiveUseCase implements ToggleUserActiveUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: ToggleUserActiveUseCase['execute'] = async ({ userId }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url.replace(':userId', userId),
      method: 'patch',
    })

    if (
      statusCode === HttpStatusCode.ok ||
      statusCode === HttpStatusCode.noContent
    )
      return

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Usuário')
    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    throw new UnexpectedError()
  }
}
