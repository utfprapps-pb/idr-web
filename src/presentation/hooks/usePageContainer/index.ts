import { ListTableParams, UseListTableParams, listTableHook } from './listTable'

type PageContainerParams<TModel extends Record<string, unknown>> = {
	listTableParams: ListTableParams<TModel>
}
type UsePageContainerParams<
	TModel extends Record<string, unknown>,
	TKeyOfModel extends string = string
> = {
	useListTableParams: UseListTableParams<TModel, TKeyOfModel>
}

export const pageContainerHook = <
	TModel extends Record<string, unknown>,
	TKeyOfModel extends string = string
>({
	listTableParams
}: PageContainerParams<TModel>) => {
	const useListTableHook = listTableHook<TModel, TKeyOfModel>(listTableParams)

	return ({
		useListTableParams
	}: UsePageContainerParams<TModel, TKeyOfModel>) => {
		const listTableHookData = useListTableHook(useListTableParams)

		return {
			...listTableHookData
		}
	}
}
