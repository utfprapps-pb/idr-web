import type { UserModel } from '@/domain/models/userModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetMe = IRequestInterface<void, UserModel>
