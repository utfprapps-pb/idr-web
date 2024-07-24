import { floatMask } from './floatMask'
import { onlyNumbersMask } from './onlyNumbers'

export const moneyMask = (value: string) => {
	const valueOnlyNumbers = onlyNumbersMask(value)
	return valueOnlyNumbers ? `R$ ${floatMask(valueOnlyNumbers)}` : ''
}
