import { useEffect, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllAnimalsUseCase } from '@/app/modules/animals/main/factories/use-cases'

import { toAnimalOption } from './to-animal-option'

type Props = {
  propertyId: string
}

export function useAllAnimalsQuery({ propertyId }: Props) {
  const getAllAnimalsUseCase = makeRemoteGetAllAnimalsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllAnimals,
  } = useQuery({
    queryKey: ['all-animals', propertyId],
    enabled: !!propertyId,
    queryFn: () => getAllAnimalsUseCase.execute({ propertyId }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar animais')
  }, [error, isError])

  const allAnimals = useMemo(() => data?.map(toAnimalOption) ?? [], [data])

  return {
    allAnimals,
    isLoading,
    refetchAllAnimals,
  }
}
