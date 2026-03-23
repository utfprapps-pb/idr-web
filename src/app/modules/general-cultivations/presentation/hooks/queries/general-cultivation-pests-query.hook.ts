import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetGeneralCultivationPestsUseCase } from '../../../main/factories/use-cases/general-cultivation-pests-use-cases'

import type {
  GeneralCultivationPestFilters,
  GeneralCultivationPestSort,
} from '../../types/general-cultivation-pest-types'

type Props = {
  filters: GeneralCultivationPestFilters
  page: number
  sort?: GeneralCultivationPestSort
}

export function useGeneralCultivationPestsQuery({
  filters,
  page,
  sort,
}: Props) {
  const getGeneralCultivationPestsUseCase =
    makeRemoteGetGeneralCultivationPestsUseCase()

  const {
    data: generalCultivationPests,
    isError,
    error,
    isLoading,
    refetch: refetchGeneralCultivationPests,
  } = useQuery({
    queryKey: ['general-cultivation-pests', { page, sort, filters }],
    queryFn: () =>
      getGeneralCultivationPestsUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError)
      toast.error(error?.message ?? 'Erro ao buscar pragas de cultivo geral')
  }, [error, isError])

  return {
    generalCultivationPests: generalCultivationPests ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchGeneralCultivationPests,
  }
}
