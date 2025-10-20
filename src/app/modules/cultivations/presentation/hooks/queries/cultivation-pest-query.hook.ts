import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetCultivationPestUseCase } from '../../../main/factories/use-cases/cultivation-pests-use-cases'

type Props = {
  id: number
  propertyId: number
}

export function useCultivationPestQuery({ id, propertyId }: Props) {
  const getCultivationPestUseCase = makeRemoteGetCultivationPestUseCase()

  const {
    data: cultivationPest,
    isError,
    error,
    isLoading,
    refetch: refetchCultivationPest,
  } = useQuery({
    queryKey: ['cultivation-pest', id],
    queryFn: () =>
      getCultivationPestUseCase.execute({
        propertyId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar praga do cultivo')
  }, [error, isError])

  return {
    cultivationPest,
    isLoading,
    refetchCultivationPest,
  }
}
