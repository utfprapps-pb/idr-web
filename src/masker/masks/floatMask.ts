export const floatMask = (value: string) => {
  const sanitizedValue = value.replace(/[^\d]/g, '').replace(/^0+/, '')
  if (!sanitizedValue) return ''

  const paddedValue = sanitizedValue.padStart(3, '0')

  const integerPart = paddedValue
    .slice(0, -2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  const decimalPart = paddedValue.slice(-2)

  return `${integerPart},${decimalPart}`
}
