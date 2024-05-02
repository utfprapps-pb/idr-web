import { RemoteGetCep } from '@/data/useCases'
import { makeBrasilApiHttpClient } from '@/main/factories/http'

import type { CepModel } from '@/domain/models'
import type { IGetCep } from '@/domain/useCases'

export const makeRemoteGetCep = (): IGetCep =>
	new RemoteGetCep('/cep/v1', makeBrasilApiHttpClient<CepModel>())
