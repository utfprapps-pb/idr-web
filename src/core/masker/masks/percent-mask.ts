import { floatMask } from './float-mask'
import { onlyNumbersMask } from './only-numbers-mask'

export function percentMask(value: string) {
  const valueOnlyNumbers = onlyNumbersMask(value)
  return valueOnlyNumbers ? `${floatMask(valueOnlyNumbers)}` : ''
}
