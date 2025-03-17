import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetForageUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
  propertyId: string
}

export function useForageQuery({ id, propertyId }: Props) {
  const getForageUseCase = makeRemoteGetForageUseCase()

  const {
    data: forage,
    isError,
    isLoading,
    refetch: refetchForage,
  } = useQuery({
    queryKey: ['forages', id],
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
