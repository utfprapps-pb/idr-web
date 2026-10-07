import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetRegionUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
}

export function useRegionQuery({ id }: Props) {
  const getRegionUseCase = makeRemoteGetRegionUseCase()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['region', id],
    queryFn: () => getRegionUseCase.execute(id),
  })

  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Erro ao buscar região')
  }, [error, isError])

  return {
    region: data,
    isLoading,
    refetchRegion: refetch,
  }
}
