import { CepModel } from '@/domain/models'

export interface IGetCep {
	execute: (cep: string) => Promise<CepModel>
}
