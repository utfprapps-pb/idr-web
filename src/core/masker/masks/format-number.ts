type Options = {
  prefix?: string
  suffix?: string
  decimals?: number
}

export function formatNumber(
  value: string | number,
  options?: Options
): string {
  const { prefix, suffix, decimals = 2 } = options || {}

  if (value === '' || value === null || value === undefined) {
    return ''
  }

  const numericValue =
    typeof value === 'string' ? Number.parseFloat(value) : value

  if (Number.isNaN(numericValue)) {
    return ''
  }

  const formatted = numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  const prefixPart = prefix ? `${prefix} ` : ''
  const suffixPart = suffix ? ` ${suffix.trim()}` : ''

  return `${prefixPart}${formatted}${suffixPart}`
}
