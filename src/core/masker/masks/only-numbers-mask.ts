export function onlyNumbersMask(value: string) {
  return value.replaceAll(/[^\d]/g, '')
}

export function onlyNumbersAndDecimalMask(value: string) {
  let cleaned = value.replace(/[^\d,.]/g, '')

  cleaned = cleaned.replace(',', '.')

  return cleaned
}
