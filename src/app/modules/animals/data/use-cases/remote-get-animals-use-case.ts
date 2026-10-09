import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../mappers/animal-breed-mapper'

import type { AnimalModel } from '../../domain/models/animals-model'
import type { GetAnimalsUseCase } from '../../domain/use-cases'
import type { Filters, MapApiProperties, Option } from '@/core/domain/types'

/** Formato real do `ListAnimalOutput`: `breedId` plano (UUID), sem objeto `breed` aninhado. */
export type AnimalSearchApiItem = {
  id: string
  identifier: string
  breedId: string
  currentWeight: number | null
  ecc: number | null
}

export type AnimalSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: AnimalSearchApiItem[]
}

function resolveTerms(filters?: Filters<AnimalModel>): string | undefined {
  if (!filters) return undefined

  const filterEntry = Object.values(filters).find(
    (filter) => filter !== undefined
  ) as { value: unknown } | undefined

  if (!filterEntry) return undefined

  const { value } = filterEntry

  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.map(String).join(',')

  return String(value)
}

export class RemoteGetAnimalsUseCase implements GetAnimalsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalModel,
      AnimalSearchApiItem,
      AnimalSearchApiResponse
    >
  ) {}

  execute: GetAnimalsUseCase['execute'] = async (
    { propertyId, filters, pagination, sort },
    breeds
  ) => {
    // `breedId` é a única coluna real que existe no backend para raça —
    // ordenar por ela não é semanticamente útil (é um UUID), mas evita
    // erro no backend; `breed.breedName` não existe no DTO real.
    const mapApiProperties: MapApiProperties<AnimalModel, AnimalSearchApiItem> =
      {
        id: 'id',
        name: 'identifier',
        breed: 'breedId',
        ecc: 'ecc',
        weight: 'currentWeight',
      }

    const url = this.url.replace(':propertyId', String(propertyId))

    const params = new URLSearchParams({
      page: String((pagination?.page ?? 1) - 1),
      perPage: String(pagination?.perPage ?? 10),
    })

    const terms = resolveTerms(filters)
    if (terms) params.set('terms', terms)

    if (sort && mapApiProperties[sort.field]) {
      params.set('sort', String(mapApiProperties[sort.field]))
      params.set('direction', sort.direction)
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => ({
          id: item.id,
          name: item.identifier,
          breed: fromApi(
            item.breedId,
            Array.isArray(breeds) ? (breeds as Option<number>[]) : []
          ).label,
          weight: item.currentWeight != null ? String(item.currentWeight) : '',
          ecc: item.ecc != null ? String(item.ecc) : '',
          milkProduction: '',
        })),
        totalPages: Math.ceil(body.total / body.perPage),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Animais')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar os animais')
    }

    throw new UnexpectedError()
  }
}
