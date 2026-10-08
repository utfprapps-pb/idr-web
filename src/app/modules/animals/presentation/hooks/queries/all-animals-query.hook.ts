import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalsUseCase } from '@/app/modules/animals/main/factories/use-cases'

type Props = {
  propertyId: string
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
      data?.resources.map((resource) => ({
        label: resource.name,
        value: resource.id,
        extraData: {
          breed: resource.breed,
          weight: resource.weight,
          ecc: resource.ecc,
          milkProduction: resource.milkProduction,
        },
      })) ?? [],
    isLoading,
    refetchAllAnimals,
  }
}
