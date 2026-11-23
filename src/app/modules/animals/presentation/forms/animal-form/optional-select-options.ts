import type { Option } from '@/core/domain/types'

/** O Select não aceita item com valor vazio: este valor representa "não informado". */
export const NOT_INFORMED = '__not_informed__'

/**
 * Itens de um Select opcional. Campo vazio mostra o placeholder (o Select
 * recebe `''`), sem "Não informado" na lista; com valor, "Não informado" vem
 * primeiro para limpar o campo. Valor antigo fora da lista continua como
 * opção, para ser preservado.
 */
export function optionalSelectOptions(
  value: string,
  values: readonly string[]
): Option<string>[] {
  const options = (
    value && !values.includes(value) ? [...values, value] : values
  ).map((item) => ({ value: item, label: item }))

  return value
    ? [{ value: NOT_INFORMED, label: 'Não informado' }, ...options]
    : options
}

/** Valor do formulário para o item escolhido: "Não informado" vira `''`. */
export function fromOptionalSelectValue(selected: string): string {
  return selected === NOT_INFORMED ? '' : selected
}

/**
 * Itens de um Select opcional alimentado por catálogo, com a mesma regra de
 * `optionalSelectOptions`. A seleção atual que não vier no catálogo (catálogo
 * com erro, ainda carregando ou item excluído) continua como opção, com o
 * próprio rótulo, para não sumir da tela nem ser trocada sem querer.
 */
export function optionalCatalogOptions(
  selected: Option<string>,
  catalog: readonly Option<string>[]
): Option<string>[] {
  if (!selected.value) return [...catalog]

  const inCatalog = catalog.some((option) => option.value === selected.value)

  return [
    { value: NOT_INFORMED, label: 'Não informado' },
    ...catalog,
    ...(inCatalog ? [] : [selected]),
  ]
}
