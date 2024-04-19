import { PropertyModel } from '@/domain/models'
import { IRequestInterface, IListParams, IListResponse } from '@/domain/shared'

export interface IGetProperties
	extends IRequestInterface<
		IListParams<keyof PropertyModel>,
		IListResponse<PropertyModel>
	> {}
