import type { CepModel } from '@/domain/models'
import type { IRequestInterface } from '@/domain/shared/types'

export interface IGetCep extends IRequestInterface<string, CepModel> {}
