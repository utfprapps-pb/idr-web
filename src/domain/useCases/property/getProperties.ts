import type { PropertyModel } from '@/domain/models'
import type {
	IRequestInterface,
	IListParams,
	IListResponse
} from '@/domain/shared/types'

export interface IGetProperties
	extends IRequestInterface<
		IListParams<keyof PropertyModel>,
		IListResponse<PropertyModel>
	> {}
