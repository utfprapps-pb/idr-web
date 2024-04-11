import { PropertyModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'
import { IListParams } from '@/domain/shared/listParamsInterface'
import { IListResponse } from '@/domain/shared/listResponseInterface'

export interface IGetProperties
	extends IRequestInterface<
		IListParams<keyof PropertyModel>,
		IListResponse<PropertyModel>
	> {}
