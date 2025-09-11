import { floatMask } from './float-mask'
import { onlyNumbersMask } from './only-numbers-mask'

export function moneyMask(value: string) {
  const valueOnlyNumbers = onlyNumbersMask(value)
  return valueOnlyNumbers ? `R$ ${floatMask(valueOnlyNumbers)}` : ''
}
