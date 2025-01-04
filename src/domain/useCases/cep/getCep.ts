import type { CepModel } from '@/domain/models/cepModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetCep = IRequestInterface<string, CepModel>
