import type { IRequestInterface, Option } from '@/domain/shared/types'

export interface IGetAllUsers extends IRequestInterface<string, Option[]> {}
