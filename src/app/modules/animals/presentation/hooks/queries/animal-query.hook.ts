import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useAllBreedsQuery } from '@/core/presentation/hooks'

import { makeRemoteGetAnimalUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
  propertyId: string
}

export function useAnimalQuery({ id, propertyId }: Props) {
  const getAnimalUseCase = makeRemoteGetAnimalUseCase()

  // Catálogo de raças já carregado pelo módulo (reaproveitado, sem fetch
  // dedicado novo) — usado para resolver `breedName` a partir do
  // `breedId` plano que o backend real devolve no Get.
  const { allBreeds } = useAllBreedsQuery({ filters: {} })

  const {
    data: animal,
    isError,
    error,
    isLoading,
    refetch: refetchAnimal,
  } = useQuery({
    queryKey: ['animal', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getAnimalUseCase.execute(
        {
          propertyId,
          animalId: id,
        },
        allBreeds
      ),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animal')
  }, [error, isError])

  return {
    animal,
    isLoading,
    refetchAnimal,
  }
}
