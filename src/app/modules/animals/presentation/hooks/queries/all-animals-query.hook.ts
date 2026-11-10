import { useEffect, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAnimalsUseCase } from '@/app/modules/animals/main/factories/use-cases'

import { toAnimalOption } from './to-animal-option'

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
    enabled: !!propertyId,
    queryFn: () =>
      getAnimalsUseCase.execute({
        propertyId,
        pagination: { page: 1, perPage: 30 },
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animais')
  }, [error, isError])

  const allAnimals = useMemo(
    () => data?.resources.map(toAnimalOption) ?? [],
    [data]
  )

  return {
    allAnimals,
    isLoading,
    refetchAllAnimals,
  }
}
