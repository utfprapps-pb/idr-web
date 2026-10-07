import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetProducerUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
}

export function useProducerQuery({ id }: Props) {
  const getProducerUseCase = makeRemoteGetProducerUseCase()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['producer', id],
    queryFn: () => getProducerUseCase.execute(id),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar produtor')
  }, [error, isError])

  return {
    producer: data,
    isLoading,
    refetchProducer: refetch,
  }
}
