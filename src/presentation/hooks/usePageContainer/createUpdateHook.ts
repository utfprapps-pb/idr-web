import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { catchError } from '@/main/utils'

import { useHookForm } from '../useHookForm'
import { useModal } from '../useModal'

import type {
	CreateResourceService,
	GetOneResourceService,
	TextBuilder,
	UpdateResourceService
} from './types'
import type { DefaultValues, FieldValues, Resolver } from 'react-hook-form'

type Services<TValues extends FieldValues> = {
	createResource: CreateResourceService<TValues>
	getOneResource: GetOneResourceService<TValues>
	updateResource: UpdateResourceService<TValues>
}

export type CreateUpdateHookProps<TValues extends FieldValues> = {
	defaultValues: DefaultValues<TValues>
	texts: {
		createResource: {
			success: TextBuilder<TValues>
			error?: TextBuilder<TValues>
		}
		updateResource: {
			success: TextBuilder<TValues>
			error?: TextBuilder<TValues>
		}
		getOneResource: {
			error?: TextBuilder<TValues>
		}
	}
	schemaResolver?: Resolver<TValues>
}

export const createUpdateHook =
	<TValues extends FieldValues = FieldValues>({
		defaultValues,
		texts,
		schemaResolver
	}: CreateUpdateHookProps<TValues>) =>
	({ createResource, getOneResource, updateResource }: Services<TValues>) => {
		const [idResourceToUpdate, setIdResourceToUpdate] = useState('')

		const [loadingValues, setLoadingValues] = useState(false)

		const sheetContainerControl = useModal()

		const form = useHookForm<TValues>({ defaultValues, schemaResolver })
		const { reset } = form

		const openUpdateSheetContainer = useCallback(
			(id: string) => {
				setIdResourceToUpdate(id)
				sheetContainerControl.open()
			},
			[sheetContainerControl]
		)

		const onSubmit = useCallback(
			async (data: TValues, event?: React.BaseSyntheticEvent) => {
				event?.preventDefault()

				if (idResourceToUpdate) {
					await updateResource.execute(data)
					toast.success(texts.updateResource.success(data))
					return
				}

				await createResource.execute(data)
				toast.success(texts.createResource.success(data))
			},
			[createResource, idResourceToUpdate, updateResource]
		)

		const getValues = useCallback(async () => {
			try {
				setLoadingValues(true)
				const values = await getOneResource.execute(idResourceToUpdate)
				reset(values)
			} finally {
				setLoadingValues(false)
			}
		}, [getOneResource, idResourceToUpdate, reset])

		const handleSubmit = () =>
			catchError(
				onSubmit,
				idResourceToUpdate
					? texts.updateResource.error?.()
					: texts.createResource.error?.()
			)

		useEffect(() => {
			if (idResourceToUpdate) {
				catchError(getValues, texts.getOneResource.error?.())
				return
			}

			reset(defaultValues)
		}, [reset, getValues, idResourceToUpdate])

		return {
			loadingValues,
			sheetContainerControl,
			idResourceToUpdate,
			form,
			handleSubmit,
			openUpdateSheetContainer
		}
	}
