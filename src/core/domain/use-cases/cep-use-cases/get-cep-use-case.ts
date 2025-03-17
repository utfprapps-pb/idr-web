import type { CepModel } from '@/core/domain/models/cep-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetCepUseCase = RequestInterface<string, CepModel>
