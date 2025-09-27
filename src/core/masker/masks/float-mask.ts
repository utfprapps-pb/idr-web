export function floatMask(value: string, suffix?: string) {
  let sanitizedValue = value.replace(/[^\d]/g, '')

  const shouldCheckForBackspace = suffix && sanitizedValue

  if (shouldCheckForBackspace) {
    const tempPadded = sanitizedValue.padStart(3, '0')
    let tempIntPart = tempPadded.slice(0, -2)
    if (tempIntPart.length > 1) {
      tempIntPart = tempIntPart.replace(/^0+/, '')
    }
    tempIntPart = tempIntPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    const tempDecPart = tempPadded.slice(-2)
    const hypotheticalNumeric = `${tempIntPart || '0'},${tempDecPart}`
    const hypotheticalFull = `${hypotheticalNumeric} ${suffix.trim()}`

    const isUserDeletingSuffix =
      hypotheticalFull.startsWith(value) && hypotheticalFull !== value

    if (isUserDeletingSuffix) {
      sanitizedValue = sanitizedValue.slice(0, -1)
    }
  }

  if (Number(sanitizedValue) === 0) {
    sanitizedValue = ''
  }

  if (!sanitizedValue) {
    return ''
  }

  const paddedValue = sanitizedValue.padStart(3, '0')

  let integerPart = paddedValue.slice(0, -2)
  if (integerPart.length > 1) {
    integerPart = integerPart.replace(/^0+/, '')
  }
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  const decimalPart = paddedValue.slice(-2)

  const finalValue = `${integerPart || '0'},${decimalPart}`

  // 5. Adicionamos o sufixo de volta, se ele existir.
  return suffix ? `${finalValue} ${suffix.trim()}` : finalValue
}
