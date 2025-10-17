import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetCultivationDiseasesUseCase } from '../../../main/factories/use-cases/cultivation-diseases-use-cases'

import type {
  CultivationDiseaseFilters,
  CultivationDiseaseSort,
} from '../../types/cultivation-disease-types'

type Props = {
  propertyId: number
  filters: CultivationDiseaseFilters
  page: number
  sort?: CultivationDiseaseSort
}

export function useCultivationDiseasesQuery({
  propertyId,
  filters,
  page,
  sort,
}: Props) {
  const getCultivationDiseasesUseCase =
    makeRemoteGetCultivationDiseasesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchCultivationDiseases,
  } = useQuery({
    queryKey: ['cultivation-diseases', { page, sort, filters }],
    queryFn: () =>
      getCultivationDiseasesUseCase.execute({
        propertyId,
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar doenças do cultivo')
  }, [error, isError])

  return {
    cultivationDiseases: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchCultivationDiseases,
  }
}
