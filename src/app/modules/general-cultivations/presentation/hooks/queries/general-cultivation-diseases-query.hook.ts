import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetGeneralCultivationDiseasesUseCase } from '../../../main/factories/use-cases/general-cultivation-diseases-use-cases'

import type {
  GeneralCultivationDiseaseFilters,
  GeneralCultivationDiseaseSort,
} from '../../types/general-cultivation-disease-types'

type Props = {
  filters: GeneralCultivationDiseaseFilters
  page: number
  sort?: GeneralCultivationDiseaseSort
}

export function useGeneralCultivationDiseasesQuery({
  filters,
  page,
  sort,
}: Props) {
  const getGeneralCultivationDiseasesUseCase =
    makeRemoteGetGeneralCultivationDiseasesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchGeneralCultivationDiseases,
  } = useQuery({
    queryKey: ['general-cultivation-diseases', { page, sort, filters }],
    queryFn: () =>
      getGeneralCultivationDiseasesUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar doenças gerais de cultivo')
  }, [error, isError])

  return {
    generalCultivationDiseases: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchGeneralCultivationDiseases,
  }
}
