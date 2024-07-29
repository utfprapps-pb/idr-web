import type { TabProps } from '../types'
import type { IGetAllUsers } from '@/domain/useCases'

export type GeneralTabProps = TabProps & {
	getAllUsers: IGetAllUsers
}
