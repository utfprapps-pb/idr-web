import { floatMask } from './floatMask'
import { onlyNumbersMask } from './onlyNumbers'

export const percentMask = (value: string) => {
  const valueOnlyNumbers = onlyNumbersMask(value)
  return valueOnlyNumbers ? `${floatMask(valueOnlyNumbers)}` : ''
}
