import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { toOption } from '@/core/utils/object/to-option'

import { makeRemoteGetGeneralCultivationsUseCase } from '../../../main/factories/use-cases/general-cultivations-use-cases'

import type { GeneralCultivationFilters } from '../../types/general-cultivation-types'

type Props = {
  filters: GeneralCultivationFilters
}

export function useAllGeneralCultivationsQuery({ filters }: Props) {
  const getGeneralCultivationsUseCase =
    makeRemoteGetGeneralCultivationsUseCase()

  const {
    data,
    isError,
    error,
    isLoading,
    refetch: refetchAllGeneralCultivations,
  } = useQuery({
    queryKey: ['all-general-cultivations', { filters }],
    queryFn: () =>
      getGeneralCultivationsUseCase.execute({
        filters,
        pagination: { page: 0, perPage: 30 },
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar cultivos gerais')
  }, [error, isError])

  return {
    allGeneralCultivations:
      data?.resources.map((resource) => toOption(resource, 'name')) ?? [],
    isLoading,
    refetchAllGeneralCultivations,
  }
}
