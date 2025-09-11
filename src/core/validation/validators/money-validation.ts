import { onlyNumbersMask } from '@/core/masker'

export function moneyValidation(value: string, minValue: number) {
  const onlyNumbers = Number(onlyNumbersMask(value) ?? 0)
  return onlyNumbers > minValue
}
