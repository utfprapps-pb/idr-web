import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalSaleUseCase } from '../../../main/factories/use-cases/animal-sales-use-cases'

type Props = {
  id: number
  propertyId: number
  animalId: number
}

export function useAnimalSaleQuery({ id, propertyId, animalId }: Props) {
  const getAnimalSaleUseCase = makeRemoteGetAnimalSaleUseCase()

  const {
    data: animalSale,
    isError,
    error,
    isLoading,
    refetch: refetchAnimalSale,
  } = useQuery({
    queryKey: ['animal-sale', id],
    queryFn: () =>
      getAnimalSaleUseCase.execute({
        propertyId,
        animalId,
        id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar venda do animal')
  }, [error, isError])

  return {
    animalSale,
    isLoading,
    refetchAnimalSale,
  }
}
