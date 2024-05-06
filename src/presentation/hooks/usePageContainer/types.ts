import type {
	IListParams,
	IListResponse,
	IRequestInterface
} from '@/domain/shared'
import type { FieldValues } from 'react-hook-form'

export type RecordWithId = {
	id: string
	[key: string]: unknown
}

export type TextBuilder<T = Record<string, unknown>> = (model?: T) => string

export type GetResourcesService<
	TModel extends RecordWithId,
	TKeyOfModel extends keyof TModel = keyof TModel
> = IRequestInterface<IListParams<TKeyOfModel>, IListResponse<TModel>>

export type DeleteResourceService = IRequestInterface<string, void>

export type CreateResourceService<TValues extends FieldValues> =
	IRequestInterface<TValues, void>

export type UpdateResourceService<TValues extends FieldValues> =
	IRequestInterface<TValues, void, { id: string }>

export type GetOneResourceService<TValues extends FieldValues> =
	IRequestInterface<string, TValues>

export type GetDependencesService<TModel> = IRequestInterface<string, TModel[]>
