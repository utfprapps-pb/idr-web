import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetGeneralCultivationsUseCase } from '../../../main/factories/use-cases/general-cultivations-use-cases'

import type {
  GeneralCultivationFilters,
  GeneralCultivationSort,
} from '../../types/general-cultivation-types'

type Props = {
  filters: GeneralCultivationFilters
  page: number
  sort?: GeneralCultivationSort
}

export function useGeneralCultivationsQuery({ filters, page, sort }: Props) {
  const getGeneralCultivationsUseCase =
    makeRemoteGetGeneralCultivationsUseCase()

  const {
    data: generalCultivations,
    isError,
    error,
    isLoading,
    refetch: refetchGeneralCultivations,
  } = useQuery({
    queryKey: ['general-cultivations', { page, sort, filters }],
    queryFn: () =>
      getGeneralCultivationsUseCase.execute({
        pagination: { page },
        sort,
        filters,
      }),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar cultivos gerais')
  }, [error, isError])

  return {
    generalCultivations,
    isLoading,
    refetchGeneralCultivations,
  }
}
