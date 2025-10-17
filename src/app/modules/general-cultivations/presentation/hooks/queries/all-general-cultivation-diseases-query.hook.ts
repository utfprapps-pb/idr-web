import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { toOption } from '@/core/utils/object/to-option'

import { makeRemoteGetGeneralCultivationDiseasesUseCase } from '../../../main/factories/use-cases/general-cultivation-diseases-use-cases'

import type { GeneralCultivationFilters } from '../../types/general-cultivation-types'

type Props = {
  filters: GeneralCultivationFilters
}

export function useAllGeneralCultivationDiseasesQuery({ filters }: Props) {
  const getGeneralCultivationDiseasesUseCase =
    makeRemoteGetGeneralCultivationDiseasesUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllGeneralCultivationDiseases,
  } = useQuery({
    queryKey: ['all-general-cultivation-diseases', { filters }],
    queryFn: () =>
      getGeneralCultivationDiseasesUseCase.execute({
        filters,
        pagination: { page: 1, perPage: 30 },
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar doenças de cultivos gerais')
  }, [error, isError])

  return {
    allGeneralCultivationDiseases:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllGeneralCultivationDiseases,
  }
}
