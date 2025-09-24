import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalPurchaseUseCase } from '../../../main/factories/use-cases/animal-purchases-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalPurchaseQuery({ id, propertyId, animalId }: Props) {
  const getAnimalPurchaseUseCase = makeRemoteGetAnimalPurchaseUseCase()

  const {
    data: animalPurchase,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalPurchase,
  } = useQuery({
    queryKey: ['animal-purchase', id],
    queryFn: () =>
      getAnimalPurchaseUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar compra do animal')
  }, [error, isError])

  return {
    animalPurchase,
    isLoading,
    refetchAnimalPurchase,
  }
}
