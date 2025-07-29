import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetPropertyUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
}

export function usePropertyQuery({ id }: Props) {
  const getPropertyUseCase = makeRemoteGetPropertyUseCase()

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyUseCase.execute(id),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar propriedade')
  }, [isError])

  return {
    property: data,
    isLoading,
    refetchProperty: refetch,
  }
}
