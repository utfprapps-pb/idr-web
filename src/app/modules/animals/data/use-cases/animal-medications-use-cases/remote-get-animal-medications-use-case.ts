import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { floatMask } from '@/core/masker'

import type {
  AnimalMedicationApplicationMethod,
  AnimalMedicationModel,
} from '../../../domain/models/animal-medications-model'
import type { GetAnimalMedicationsUseCase } from '../../../domain/use-cases/animal-medications-use-cases'
import type { Filters } from '@/core/domain/types'

export type AnimalMedicationSearchApiItem = {
  id: string
  applicationDate: string
  appliedDose: string
  applicationWay: string
  // `product`/`activeIngredient` mantidos como estavam — resolução via
  // catálogo real `Product` não é religada nesta entrega.
  product: string
  activeIngredient: string
}

export type AnimalMedicationSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: AnimalMedicationSearchApiItem[]
}

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'applicationDate',
  appliedDose: 'appliedDose',
  applicationMethod: 'applicationWay',
  product: 'product',
  activeIngredient: 'activeIngredient',
}

function resolveTerms(
  filters?: Filters<AnimalMedicationModel>
): string | undefined {
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

export class RemoteGetAnimalMedicationsUseCase
  implements GetAnimalMedicationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMedicationModel,
      AnimalMedicationSearchApiItem,
      AnimalMedicationSearchApiResponse
    >
  ) {}

  execute: GetAnimalMedicationsUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const params = new URLSearchParams({
      page: String((pagination?.page ?? 1) - 1),
      perPage: String(pagination?.perPage ?? 10),
    })

    const terms = resolveTerms(filters)
    if (terms) params.set('terms', terms)

    if (sort) {
      params.set(
        'sort',
        SORT_FIELD_MAP[String(sort.field)] ?? String(sort.field)
      )
      params.set('direction', sort.direction)
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      const applicationMethodMapper: Record<
        AnimalMedicationApplicationMethod,
        string
      > = {
        IM: 'IM',
        IV: 'IV',
        SC: 'SC',
        IntraMammary: 'Intra Mamária',
        PourOn: 'Pour On',
      }

      return {
        resources: body.items.map((item) => {
          return {
            id: item.id,
            date: new Date(item.applicationDate),
            product: item.product,
            appliedDose: floatMask(item.appliedDose, 'mg/ml'),
            activeIngredient: item.activeIngredient,
            applicationMethod:
              applicationMethodMapper[
                item.applicationWay as AnimalMedicationApplicationMethod
              ],
          }
        }),
        totalPages: Math.ceil(body.total / body.perPage),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Medicações do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as medicações deste animal'
      )
    }

    throw new UnexpectedError()
  }
}
