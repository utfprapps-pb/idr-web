import { PropsWithChildren, createContext, useContext, useMemo } from 'react'

type Props<TData> = {
	providerFn: () => TData
}

export const createCustomContextFactory = <TContextValue extends Object = {}>({
	providerFn
}: Props<TContextValue>) => {
	const Context = createContext<TContextValue>({} as TContextValue)

	const Provider: React.FC<PropsWithChildren> = ({ ...providerProps }) => {
		const data = providerFn()

		const providerValueProps = useMemo(
			() => ({ ...providerProps, ...data }),
			[data, providerProps]
		)

		return (
			<Context.Provider value={providerValueProps}>
				{providerProps.children}
			</Context.Provider>
		)
	}

	const useCustomContext = () => {
		if (!Context) {
			throw new Error('useContext should be used within <Provider>')
		}

		return useContext(Context)
	}

	return {
		Context,
		Provider,
		useContext: useCustomContext
	}
}
