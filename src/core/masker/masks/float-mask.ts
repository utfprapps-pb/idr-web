export function floatMask(value: string, suffix?: string) {
  const hasDecimalSeparator = /[.,]/.test(value)

  let sanitizedValue: string
  let integerPart: string
  let decimalPart: string

  if (hasDecimalSeparator) {
    const parts = value.replace(/[^\d.,]/g, '').split(/[.,]/)
    const intPart = parts[0] || '0'
    const decPart = (parts[1] || '').slice(0, 2).padEnd(2, '0')

    integerPart = intPart.replace(/^0+/, '') || '0'
    decimalPart = decPart
  } else {
    sanitizedValue = value.replace(/[^\d]/g, '')

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

    integerPart = sanitizedValue
    decimalPart = '00'

    if (integerPart.length > 1) {
      integerPart = integerPart.replace(/^0+/, '')
    }
  }

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  const finalValue = `${integerPart || '0'},${decimalPart}`

  return suffix ? `${finalValue} ${suffix.trim()}` : finalValue
}
