import { onlyNumbersMask } from '@/masker'

export const moneyValidation = (value: string, minValue: number) => {
	const onlyNumbers = Number(onlyNumbersMask(value) ?? 0)
	return onlyNumbers > minValue
}
