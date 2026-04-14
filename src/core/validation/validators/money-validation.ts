import { onlyNumbersMask } from '@/core/masker'

export function moneyValidation(value: string | number, minValue: number) {
  if (typeof value === 'number') {
    return value >= minValue
  }
  const onlyNumbers = Number(onlyNumbersMask(value) ?? 0)
  return onlyNumbers >= minValue
}
