import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import type { IGetProperty } from '@/domain/useCases/property'

type Props = {
  id: string
  getProperty: IGetProperty
}

export const useProperty = ({ id, getProperty }: Props) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty.execute(id),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar propriedade')
  }, [isError])

  return {
    property: data,
    isLoading,
    refetchProperty: refetch,
  }
}
