import { FieldValues } from 'react-hook-form'

import {
	type CreateUpdateHookProps,
	createUpdateHook
} from './createUpdateHook'
import { type ListDeleteHookProps, listDeleteHook } from './listDeleteHook'

import type {
	CreateResourceService,
	DeleteResourceService,
	GetOneResourceService,
	GetResourcesService,
	RecordWithId,
	UpdateResourceService
} from './types'

type Services<TModel extends RecordWithId, TValues extends FieldValues> = {
	getResources: GetResourcesService<TModel>
	deleteResource: DeleteResourceService
	createResource: CreateResourceService<TValues>
	getOneResource: GetOneResourceService<TValues>
	updateResource: UpdateResourceService<TValues>
}

export type PageContainerHookProps<
	TModel extends RecordWithId,
	TValues extends FieldValues
> = {
	listDeleteHookProps: ListDeleteHookProps<TModel>
	createUpdateHookProps: CreateUpdateHookProps<TValues>
}

export const pageContainerHook = <
	TModel extends RecordWithId,
	TValues extends FieldValues
>({
	listDeleteHookProps,
	createUpdateHookProps
}: PageContainerHookProps<TModel, TValues>) => {
	const useListDeleteHook = listDeleteHook(listDeleteHookProps)
	const useCreateUpdateHook = createUpdateHook(createUpdateHookProps)

	return ({
		createResource,
		deleteResource,
		getOneResource,
		getResources,
		updateResource
	}: Services<TModel, TValues>) => {
		const listDeleteHookData = useListDeleteHook({
			deleteResource,
			getResources
		})
		const createUpdateHookData = useCreateUpdateHook({
			createResource,
			getOneResource,
			updateResource
		})

		return {
			...listDeleteHookData,
			...createUpdateHookData
		}
	}
}
