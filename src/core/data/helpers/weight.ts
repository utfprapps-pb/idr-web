import { formatNumber, unmaskFloat } from '@/core/masker'

/** Masked form weight (`"450,00 kg"`) -> kilograms for the API; empty -> `null`. */
export function toApiWeight(weight: string): number | null {
  return weight ? unmaskFloat(weight) : null
}

/** API kilograms -> the masked string the weight inputs expect (`"450,00 kg"`). */
export function fromApiWeight(weight: number | null): string {
  return formatNumber(weight ?? '', { suffix: 'kg' })
}
