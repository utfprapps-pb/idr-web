import { buildSearchQuery } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApiListItem } from '../mappers/animal-api-mapper'

import type {
  AnimalApiResponse,
  AnimalModel,
} from '../../domain/models/animals-model'
import type { GetAllAnimalsUseCase } from '../../domain/use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

/** Trava contra um servidor que nunca devolva página vazia nem o total. */
const MAX_PAGES = 1000

/**
 * Busca o rebanho inteiro percorrendo `GET /search` página a página: para
 * quando junta `total` itens ou recebe uma página vazia. Qualquer página com
 * erro interrompe a busca, e chegar a `maxPages` sem juntar o `total` também
 * (`UnexpectedError`): o rebanho nunca volta pela metade por causa de erro ou
 * do limite. Página vazia antes do `total` encerra com o que veio (o servidor
 * não tem mais itens para entregar).
 */
export class RemoteGetAllAnimalsUseCase implements GetAllAnimalsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalModel,
      AnimalApiResponse,
      SearchApiResponse<AnimalApiResponse>
    >,
    private readonly perPage = 100,
    private readonly maxPages = MAX_PAGES
  ) {}

  execute: GetAllAnimalsUseCase['execute'] = async ({ propertyId }) =>
    this.fetchFrom(this.url.replace(':propertyId', String(propertyId)), 1, [])

  /** Páginas em sequência: cada uma decide, pelo `total`, se há próxima. */
  private async fetchFrom(
    url: string,
    page: number,
    animals: AnimalModel[]
  ): Promise<AnimalModel[]> {
    const query = buildSearchQuery({
      pagination: { page, perPage: this.perPage },
    })

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode !== HttpStatusCode.ok || !body) {
      this.throwError(statusCode)
    }

    const collected = [...animals, ...body.items.map(fromApiListItem)]

    if (body.items.length === 0 || collected.length >= body.total) {
      return collected
    }

    if (page >= this.maxPages) {
      throw new UnexpectedError()
    }

    return this.fetchFrom(url, page + 1, collected)
  }

  private throwError(statusCode: HttpStatusCode): never {
    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Animais')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar os animais')
    }

    throw new UnexpectedError()
  }
}
