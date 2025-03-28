import { PropsWithChildren, createContext, useContext, useMemo } from 'react'

type Props<TData> = {
  providerFn: () => TData
}

export function createCustomContext<TContextValue extends object = object>({
  providerFn,
}: Props<TContextValue>) {
  const Context = createContext<TContextValue>({} as TContextValue)

  const Provider = ({ ...providerProps }: PropsWithChildren) => {
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
    useContext: useCustomContext,
  }
}
