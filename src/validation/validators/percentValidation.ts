import { onlyNumbersMask } from '@/masker'

export const percentValidation = (value: string) => {
  const valueNumber = Number(onlyNumbersMask(value) ?? 0) / 100
  return valueNumber >= 0.01 && valueNumber <= 100
}
