import { CepModel } from '@/domain/models'

export interface GetCep {
	get: (cep: string) => Promise<CepModel>
}
