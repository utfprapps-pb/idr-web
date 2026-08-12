import type { RequestInterface } from '@/core/domain/types'

export type ToggleUserActiveUseCase = RequestInterface<{ userId: string }, void>
