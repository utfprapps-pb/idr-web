import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ImprovementDataFactory } from '@/main/factories/useCases/improvement'

type Props = {
  id: string
  propertyId: string
}

export const useImprovement = ({ id, propertyId }: Props) => {
  const getImprovement = ImprovementDataFactory.makeRemoteGetImprovement()

  const {
    data: improvement,
    isError,
    isLoading,
    refetch: refetchImprovement,
  } = useQuery({
    queryKey: ['improvement', id],
    queryFn: () =>
      getImprovement.execute({
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
