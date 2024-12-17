import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { PerennialForageDataFactory } from '@/main/factories/useCases/perennialForage'

type Props = {
  id: string
  propertyId: string
}

export const usePerennialForage = ({ id, propertyId }: Props) => {
  const getPerennialForage = PerennialForageDataFactory.makeRemoteGetOne()

  const {
    data: perennialForage,
    isError,
    isLoading,
    refetch: refetchPerennialForage,
  } = useQuery({
    queryKey: ['perennialForage', id],
    queryFn: () =>
      getPerennialForage.execute({
        propertyId,
        perennialForageId: id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar forrageira perene')
  }, [isError])

  return {
    perennialForage,
    isLoading,
    refetchPerennialForage,
  }
}
