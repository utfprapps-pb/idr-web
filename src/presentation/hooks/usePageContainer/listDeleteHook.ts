import { useCallback, useMemo, useState } from 'react'

import toast from 'react-hot-toast'

import { catchError } from '@/main/utils'

import { type ListHookProps, listHook } from './listHook'

import type {
	DeleteResourceService,
	GetResourcesService,
	RecordWithId,
	TextBuilder
} from './types'

type Services<TModel extends RecordWithId> = {
	deleteResource: DeleteResourceService
	getResources: GetResourcesService<TModel>
}

export type ListDeleteHookProps<TModel extends RecordWithId> = {
	texts: {
		deleteResource: {
			success: TextBuilder<TModel>
			error?: TextBuilder<TModel>
		}
	}
} & ListHookProps<TModel>

export const listDeleteHook = <TModel extends RecordWithId>({
	texts
}: ListDeleteHookProps<TModel>) => {
	const useListHook = listHook<TModel>({
		texts: {
			getResources: texts.getResources
		}
	})

	return ({ deleteResource, getResources }: Services<TModel>) => {
		const listHookData = useListHook(getResources)
		const { resources, setLoading } = listHookData

		const [resourceIdToExclude, setResourceIdToExclude] = useState('')
		const resourceToExclude = useMemo<TModel | undefined>(
			() => resources.find(({ id }) => id === resourceIdToExclude),
			[resourceIdToExclude, resources]
		)

		const deleteResourceFn = useCallback(async () => {
			try {
				setLoading(true)

				await deleteResource.execute(resourceIdToExclude)

				setResourceIdToExclude('')

				toast.success(texts.deleteResource.success(resourceToExclude!))

				await listHookData.handleGetResources()
			} finally {
				setLoading(false)
			}
		}, [
			deleteResource,
			listHookData,
			resourceIdToExclude,
			resourceToExclude,
			setLoading
		])

		const handleDeleteResource = () =>
			catchError(
				deleteResourceFn,
				texts.deleteResource.error?.(resourceToExclude!)
			)

		return {
			...listHookData,
			resourceToExclude,
			setResourceIdToExclude,
			handleDeleteResource
		}
	}
}
