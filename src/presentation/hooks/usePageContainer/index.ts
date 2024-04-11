import { ListTableParams, UseListTableParams, listTable } from './listTable'

type PageContainerParams<TModel extends Record<string, unknown>> = {
	listTableParams: ListTableParams<TModel>
}
type UsePageContainerParams<
	TModel extends Record<string, unknown>,
	TKeyOfModel extends string = string
> = {
	useListTableParams: UseListTableParams<TModel, TKeyOfModel>
}

export const pageContainer = <
	TModel extends Record<string, unknown>,
	TKeyOfModel extends string = string
>({
	listTableParams
}: PageContainerParams<TModel>) => {
	const useListTableHook = listTable<TModel, TKeyOfModel>(listTableParams)

	return ({
		useListTableParams
	}: UsePageContainerParams<TModel, TKeyOfModel>) => {
		const listTableHook = useListTableHook(useListTableParams)

		return {
			...listTableHook
		}
	}
}
