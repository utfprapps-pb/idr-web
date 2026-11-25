import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetAllAnimalSizesUseCase } from '@/core/main/factories/use-cases/animal-sizes-use-cases'

/** Catálogo de portes do animal (tipo de raça): poucos itens, buscados numa página só. */
export function useAllAnimalSizesQuery() {
  const getAllAnimalSizes = makeRemoteGetAllAnimalSizesUseCase()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['all-animal-sizes'],
    queryFn: () =>
      getAllAnimalSizes.execute({
        pagination: {
          page: 1,
          perPage: 30,
        },
      }),
    select: (response) =>
      response.resources.map((resource) => ({
        label: resource.name,
        value: resource.id,
      })),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar portes')
  }, [error, isError])

  return {
    allAnimalSizes: data ?? [],
    isLoading,
  }
}
