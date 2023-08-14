import { CepModel } from '@/domain/models'

export interface GetCep {
	execute: (cep: string) => Promise<CepModel>
}
