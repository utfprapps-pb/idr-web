import { InvalidFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class CpfValidation implements FieldValidation {
	constructor(readonly field: string) {}

	isCpf(cpf: string): boolean {
		if (!cpf) return false

		const sumWeights = (value: string, weights: number[]) =>
			weights.reduce(
				(acc, weight, index) => acc + weight * Number(value[index]),
				0
			)

		const validateSum = (sum: number) =>
			(sum * 10) % 11 === 10 ? 0 : (sum * 10) % 11

		const firstDigit = (value: string) => {
			const weights = Array.from({ length: 9 }, (_, index) => 10 - index)
			const sum = sumWeights(value, weights)
			return validateSum(sum)
		}

		const secondDigit = (value: string) => {
			const weights = Array.from({ length: 10 }, (_, index) => 11 - index)
			const sum = sumWeights(value, weights)
			return validateSum(sum)
		}

		const cpfOnlyNumbers: string = cpf.replaceAll(/\D/gi, '')

		if (cpfOnlyNumbers.length !== 11) {
			return false
		}

		if (cpfOnlyNumbers[10] !== String(secondDigit(cpfOnlyNumbers))) {
			return false
		}

		if (cpfOnlyNumbers[9] !== String(firstDigit(cpfOnlyNumbers))) {
			return false
		}

		return true
	}

	validate(input: object): Error | null {
		const [, cpf] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		if (this.isCpf(cpf)) {
			return null
		}

		return new InvalidFieldError('CPF inválido')
	}
}
