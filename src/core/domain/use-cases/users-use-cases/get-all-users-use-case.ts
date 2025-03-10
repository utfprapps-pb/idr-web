import type { RequestInterface, Option } from '@/core/domain/types'

export type GetAllUsersUseCase = RequestInterface<string, Option[]>
