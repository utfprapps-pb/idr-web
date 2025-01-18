import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ForageDataFactory } from '@/main/factories/useCases/forage'

type Props = {
  id: string
  propertyId: string
}

export const useForage = ({ id, propertyId }: Props) => {
  const getForage = ForageDataFactory.makeRemoteGetForage()

  const {
    data: forage,
    isError,
    isLoading,
    refetch: refetchForage,
  } = useQuery({
    queryKey: ['forages', id],
    queryFn: () =>
      getForage.execute({
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
