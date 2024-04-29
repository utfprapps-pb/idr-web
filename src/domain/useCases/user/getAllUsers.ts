import { IRequestInterface, Option } from '@/domain/shared'

export interface IGetAllUsers extends IRequestInterface<string, Option[]> {}
