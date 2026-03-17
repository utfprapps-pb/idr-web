import { floatMask } from './float-mask'

export function percentMask(value: string) {
  return floatMask(value, '%')
}
