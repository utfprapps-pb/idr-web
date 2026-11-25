import { isValid, parseISO } from 'date-fns'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { problemResponse } from '@/core/mocks/utils'

const LOCAL_DATE = /^\d{4}-\d{2}-\d{2}$/

/** Campos obrigatórios ausentes, nulos ou em branco no corpo da requisição. */
export function missingRequiredFields<TKey extends string>(
  body: Partial<Record<TKey, unknown>> | null | undefined,
  fields: readonly TKey[]
): TKey[] {
  return fields.filter((field) => {
    const value = body?.[field]
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
    )
  })
}

/** 400 de validação no formato Problem Details da API. */
export function validationProblem(detail: string) {
  return problemResponse(
    HttpStatusCode.badRequest,
    'validacao',
    'Erro de validação',
    detail
  )
}

/** 404 no formato Problem Details da API. */
export function notFoundProblem(detail: string) {
  return problemResponse(
    HttpStatusCode.notFound,
    'nao-encontrado',
    'Recurso não encontrado',
    detail
  )
}

/** 400 da API ao registrar um segundo óbito para o mesmo animal. */
export function deathAlreadyRegisteredProblem(animalId: string) {
  return validationProblem(
    `O animal com o ID ${animalId} já possui morte registrada`
  )
}

export function requiredFieldsProblem(missing: readonly string[]) {
  return validationProblem(
    `Campos obrigatórios não informados: ${missing.join(', ')}`
  )
}

/** `terms` (sem espaços nas pontas) é uma data `yyyy-MM-dd` que existe. */
export function isLocalDateTerm(terms: string): boolean {
  const trimmed = terms.trim()
  return LOCAL_DATE.test(trimmed) && isValid(parseISO(trimmed))
}

/**
 * Busca dos eventos como a API: `terms` com uma data `yyyy-MM-dd` válida
 * filtra pela data do evento; qualquer outro termo devolve todos.
 */
export function matchesEventDate<TItem>(field: keyof TItem) {
  return (item: TItem, terms: string): boolean =>
    !isLocalDateTerm(terms) || item[field] === terms.trim()
}
