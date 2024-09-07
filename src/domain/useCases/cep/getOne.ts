import type { CepModel } from '@/domain/models/cepModel'
import type { IRequestInterface } from '@/domain/shared/types'

export interface IGetCep extends IRequestInterface<string, CepModel> {}
