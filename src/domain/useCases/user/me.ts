import type { UserModel } from '@/domain/models/userModel'
import type { IRequestInterface } from '@/domain/shared/types'

export interface IMeUser extends IRequestInterface<void, UserModel> {}
