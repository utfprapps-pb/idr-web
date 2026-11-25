/**
 * Valor que o Combobox passa ao cmdk no lugar de `''`. O cmdk 1.0 guarda o
 * item destacado pelo valor, e `''` equivale a "nenhum destacado": um item
 * como "Nenhuma" (mãe) ou "Produto não cadastrado" não seria escolhido pelo
 * teclado. O item devolvido em `handleSelect` continua com `value: ''`.
 */
export const EMPTY_COMMAND_VALUE = '__combobox_empty__'

/** Valor do item para o cmdk (que apara espaços nas pontas). */
export function toCommandValue(value: string | number): string {
  const text = String(value).trim()
  return text === '' ? EMPTY_COMMAND_VALUE : text
}

/** Item original correspondente ao valor que o cmdk devolveu no `onSelect`. */
export function findByCommandValue<TItem extends { value: string | number }>(
  items: readonly TItem[],
  commandValue: string
): TItem | undefined {
  return items.find((item) => toCommandValue(item.value) === commandValue)
}
