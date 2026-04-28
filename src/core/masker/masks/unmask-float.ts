export function unmaskFloat(value: string | number | undefined | null): number {
  if (value === undefined || value === null) return 0
  if (typeof value === 'number') return value

  const stringValue = String(value)
  const cleanValue = stringValue.replace(/\./g, '').replace(',', '.')
  const numericString = cleanValue.replace(/[^\d.-]/g, '')

  return Number.parseFloat(numericString) || 0
}
