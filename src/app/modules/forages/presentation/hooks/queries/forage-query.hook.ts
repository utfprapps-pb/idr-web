import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetForageUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: number
  propertyId: number
}

export function useForageQuery({ id, propertyId }: Props) {
  const getForageUseCase = makeRemoteGetForageUseCase()

  const {
    data: forage,
    isError,
    isLoading,
    refetch: refetchForage,
  } = useQuery({
    queryKey: ['forages', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getForageUseCase.execute({
        propertyId,
        forageId: id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar forrageira')
  }, [isError])

  return {
    forage,
    isLoading,
    refetchForage,
  }
}
