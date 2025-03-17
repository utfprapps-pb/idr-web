import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetImprovementUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
  propertyId: string
}

export function useImprovementQuery({ id, propertyId }: Props) {
  const getImprovementUseCase = makeRemoteGetImprovementUseCase()

  const {
    data: improvement,
    isError,
    isLoading,
    refetch: refetchImprovement,
  } = useQuery({
    queryKey: ['improvement', id],
    queryFn: () =>
      getImprovementUseCase.execute({
        propertyId,
        improvementId: id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar benfeitoria')
  }, [isError])

  return {
    improvement,
    isLoading,
    refetchImprovement,
  }
}
