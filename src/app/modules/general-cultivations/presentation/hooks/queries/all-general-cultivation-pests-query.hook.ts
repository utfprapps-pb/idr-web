import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { toOption } from '@/core/utils/object/to-option'

import { makeRemoteGetGeneralCultivationPestsUseCase } from '../../../main/factories/use-cases/general-cultivation-pests-use-cases'

import type { GeneralCultivationPestFilters } from '../../types/general-cultivation-pest-types'

type Props = {
  filters: GeneralCultivationPestFilters
}

export function useAllGeneralCultivationPestsQuery({ filters }: Props) {
  const getGeneralCultivationPestsUseCase =
    makeRemoteGetGeneralCultivationPestsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllGeneralCultivationPests,
  } = useQuery({
    queryKey: ['all-general-cultivation-pests', { filters }],
    queryFn: () =>
      getGeneralCultivationPestsUseCase.execute({
        filters,
        pagination: { page: 1, perPage: 30 },
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar pragas de cultivos gerais')
  }, [error, isError])

  return {
    allGeneralCultivationPests:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllGeneralCultivationPests,
  }
}
