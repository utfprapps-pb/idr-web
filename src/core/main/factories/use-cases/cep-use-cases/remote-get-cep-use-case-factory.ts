import { RemoteGetCepUseCase } from '@/core/data/use-cases/cep-use-cases'
import { makeBrasilApiHttpClient } from '@/core/main/factories/http'

import type { CepModel } from '@/core/domain/models/cep-model'
import type { GetCepUseCase } from '@/core/domain/use-cases/cep-use-cases'

export function makeRemoteGetCepUseCase(): GetCepUseCase {
  return new RemoteGetCepUseCase('/cep/v1', makeBrasilApiHttpClient<CepModel>())
}
