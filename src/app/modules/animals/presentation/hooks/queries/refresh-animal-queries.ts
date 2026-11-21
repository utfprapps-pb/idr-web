import type { QueryClient } from '@tanstack/react-query'

/**
 * Depois de salvar um animal: invalida as listas da propriedade e, na edição,
 * descarta o detalhe em cache. Só invalidar o detalhe não basta: ao reabrir,
 * o React Query mostraria o dado antigo até o refetch, e o PUT (que substitui
 * tudo) poderia regravá-lo.
 */
export function refreshAnimalQueries(
  queryClient: QueryClient,
  propertyId: string,
  animalId?: string
) {
  if (animalId) {
    queryClient.removeQueries({
      queryKey: ['animal', propertyId, animalId],
      exact: true,
    })
  }

  queryClient.invalidateQueries({
    queryKey: ['animals', propertyId],
    exact: false,
  })
}
