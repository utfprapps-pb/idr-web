import { CepModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'

export interface IGetCep extends IRequestInterface<string, CepModel> {}
