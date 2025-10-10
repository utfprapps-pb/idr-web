import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateForageUseCase } from '../../domain/use-cases'

// Tipos usados para sanitização
type SelectOption = {
  label: string
  value: number
}

type ForagePayload = {
  id: number | string
  cultivation: SelectOption
  averageCost: string | number | undefined | null
  formation: string | undefined | null // Adicionamos 'formation' aqui
  [key: string]: any
}

// Função auxiliar para garantir o formato 'MM' ou 'DD' (com zero à esquerda se necessário)
const padTo2Digits = (num: number) => num.toString().padStart(2, '0')

export class RemoteUpdateForageUseCase implements UpdateForageUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  execute: UpdateForageUseCase['execute'] = async ({
    propertyId,
    forage,
  }) => {
    const { id, cultivation, averageCost, formation, ...restOfForage } = forage as ForagePayload

    const sanitizedAverageCost = averageCost
        ? Number(
              String(averageCost)
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim()
            )
        : undefined
 
    let sanitizedFormationDate: string | undefined

    if (formation) {
      try {
        const date = new Date(formation)
        
        // Verifica se a data é válida antes de tentar formatar
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear()
          // O método getMonth() retorna 0 para Janeiro, 11 para Dezembro.
          const month = padTo2Digits(date.getMonth() + 1)
          const day = padTo2Digits(date.getDate()+1)

          // Formata como YYYY-MM-DD
          sanitizedFormationDate = `${year}-${month}-${day}`
        }
      } catch (error) {
        // Em caso de falha na criação da data, envia undefined ou a string original para debug
        console.error('Erro ao parsear a data de formação:', formation, error)
        sanitizedFormationDate = undefined
      }
    }

    const bodyToSend = {
      ...restOfForage,
      cultivation: cultivation.label,
      averageCost: sanitizedAverageCost,
      formation: sanitizedFormationDate,
    }

    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: bodyToSend,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma forrageira',
      )
    }

    throw new UnexpectedError()
  }
}
