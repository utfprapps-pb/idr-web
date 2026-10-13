import { moneyMask } from '@/core/masker'

export function toMoneyString(value: number): string {
  return moneyMask(String(Math.round(value * 100)))
}
