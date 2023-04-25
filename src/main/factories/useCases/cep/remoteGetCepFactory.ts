import { RemoteGetCep } from '@/data/useCases/cep'
import { CepModel } from '@/domain/models'
import { GetCep } from '@/domain/useCases/cep'
import { makeBrasilApiHttpClient } from '@/main/factories/http'

export const makeRemoteGetCep = (): GetCep =>
	new RemoteGetCep('/cep/v1', makeBrasilApiHttpClient<CepModel>())
