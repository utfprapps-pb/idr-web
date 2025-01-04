import { CepData } from '@/data/useCases/cep'
import { makeBrasilApiHttpClient } from '@/main/factories/http'

import type { CepModel } from '@/domain/models/cepModel'
import type { IGetCep } from '@/domain/useCases/cep'

export const makeRemoteGetCep = (): IGetCep =>
  new CepData.RemoteGetCep('/cep/v1', makeBrasilApiHttpClient<CepModel>())
