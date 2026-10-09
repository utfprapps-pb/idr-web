import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useAllBreedsQuery } from '@/core/presentation/hooks'

import { makeRemoteGetAnimalsUseCase } from '../../../main/factories/use-cases'

import type { AnimalFilters, AnimalSort } from '../../types/animal-types'

type Props = {
  propertyId: string
  filters: AnimalFilters
  page: number
  sort?: AnimalSort
}

export function useAnimalsQuery({ propertyId, filters, page, sort }: Props) {
  const getAnimalsUseCase = makeRemoteGetAnimalsUseCase()

  // Catálogo de raças já carregado pelo módulo (reaproveitado, sem fetch
  // dedicado novo) — usado para resolver `breedName` a partir do
  // `breedId` plano que o backend real devolve na busca, mesma
  // convenção de `useAnimalQuery`.
  const { allBreeds } = useAllBreedsQuery({ filters: {} })

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAnimals,
  } = useQuery({
    queryKey: ['animals', propertyId, { page, sort, filters }],
    enabled: !!propertyId,
    queryFn: () =>
      getAnimalsUseCase.execute(
        {
          propertyId,
          pagination: { page },
          sort,
          filters,
        },
        allBreeds
      ),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animais')
  }, [error, isError])

  return {
    animals: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchAnimals,
  }
}
