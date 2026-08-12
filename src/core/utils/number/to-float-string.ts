import { floatMask } from '@/core/masker'

export function toFloatString(value: number): string {
  return floatMask(String(Math.round(value * 100)))
}
