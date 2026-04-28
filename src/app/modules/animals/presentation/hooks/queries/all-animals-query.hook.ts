import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalsUseCase } from '@/app/modules/animals/main/factories/use-cases'
import { toOption } from '@/core/utils/object/to-option'

type Props = {
  propertyId: number
}

export function useAllAnimalsQuery({ propertyId }: Props) {
  const getAnimalsUseCase = makeRemoteGetAnimalsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllAnimals,
  } = useQuery({
    queryKey: ['all-animals', propertyId],
    queryFn: () =>
      getAnimalsUseCase.execute({
        propertyId,
        pagination: { page: 1, perPage: 30 },
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animais')
  }, [error, isError])

  return {
    allAnimals:
      data?.resources.map((resource) =>
        toOption(resource, 'name', {
          breed: resource.breed,
          weight: resource.weight,
          ecc: resource.ecc,
          milkProduction: resource.milkProduction,
        })
      ) ?? [],
    isLoading,
    refetchAllAnimals,
  }
}
