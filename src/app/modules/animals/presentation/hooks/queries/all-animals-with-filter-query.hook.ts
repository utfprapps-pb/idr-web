import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalsUseCase } from '@/app/modules/animals/main/factories/use-cases'

import type { AnimalFilters } from '@/app/modules/animals/presentation/types/animal-types'

type Props = {
  propertyId: string
  filters: AnimalFilters
  perPage?: number
}

export function useAllAnimalsWithFilterQuery({
  propertyId,
  filters,
  perPage,
}: Props) {
  const getAnimalsUseCase = makeRemoteGetAnimalsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllAnimals,
  } = useQuery({
    queryKey: ['all-animals', propertyId, { filters }],
    enabled: !!propertyId,
    queryFn: () =>
      getAnimalsUseCase.execute({
        propertyId,
        filters,
        pagination: { page: 1, perPage },
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animais')
  }, [error, isError])

  /** toOption() força value: number; construído diretamente aqui pois o id é uma string UUID. */
  const allAnimals =
    data?.resources.map((resource) => ({
      label: resource.name,
      value: resource.id,
      extraData: {
        breed: resource.breed,
        weight: resource.weight,
        ecc: resource.ecc,
        milkProduction: resource.milkProduction,
      },
    })) ?? []

  return {
    allAnimals,
    isLoading,
    refetchAllAnimals,
  }
}
