import { useCallback, useState } from 'react'

import { catchError } from '@/main/utils'
import { useDebounce } from '@/presentation/hooks/useDebounce'

import type { GetDependencesService, TextBuilder } from './types'

export type DependencesHookProps = {
	texts: {
		getDependences: {
			error?: TextBuilder
		}
	}
}

export const dependencesHook =
	<TModel>({
		texts: {
			getDependences: { error }
		}
	}: DependencesHookProps) =>
	(getDependences: GetDependencesService<TModel>) => {
		const [loadingDependences, setLoadingDependences] = useState(true)
		const [dependences, setDependences] = useState<TModel[]>([])
		const [search, setSearch] = useState('')

		const handleGetDependences = useCallback(async () => {
			try {
				setLoadingDependences(true)
				if (!search.trim()) {
					setDependences([])
					return
				}
				const data = await getDependences.execute(search)
				setDependences(data)
			} finally {
				setLoadingDependences(false)
			}
		}, [getDependences, search])

		const { clear: clearSearch } = useDebounce({
			deps: [handleGetDependences],
			ms: 500,
			fn: () => catchError(handleGetDependences, error?.())
		})

		return {
			dependences,
			loadingDependences,
			search,
			setSearch,
			clearSearch
		}
	}
