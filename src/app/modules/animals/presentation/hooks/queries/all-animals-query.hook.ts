import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalsUseCase } from '@/app/modules/animals/main/factories/use-cases'
import { toOption } from '@/core/utils/object/to-option'

import type { AnimalFilters } from '@/app/modules/animals/presentation/types/animal-types'

type Props = {
  propertyId: number
  filters: AnimalFilters
}

export function useAllAnimalsQuery({ propertyId, filters }: Props) {
  const getAnimalsUseCase = makeRemoteGetAnimalsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllAnimals,
  } = useQuery({
    queryKey: ['all-animals', { filters }],
    queryFn: () =>
      getAnimalsUseCase.execute({
        propertyId,
        filters,
        pagination: { page: 1, perPage: 30 },
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animais')
  }, [error, isError])

  return {
    allAnimals:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllAnimals,
  }
}
