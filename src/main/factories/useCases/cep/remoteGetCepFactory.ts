import { RemoteGetCep } from '@/data/useCases'
import { CepModel } from '@/domain/models'
import { IGetCep } from '@/domain/useCases'
import { makeBrasilApiHttpClient } from '@/main/factories/http'

export const makeRemoteGetCep = (): IGetCep =>
	new RemoteGetCep('/cep/v1', makeBrasilApiHttpClient<CepModel>())
