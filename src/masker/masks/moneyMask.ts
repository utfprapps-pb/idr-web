import { floatMask } from './floatMask'

export const moneyMask = (value: string) => `R$ ${floatMask(value)}`
