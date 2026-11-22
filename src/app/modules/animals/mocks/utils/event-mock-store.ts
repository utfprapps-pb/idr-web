type Owned<TRecord> = { record: TRecord; animalId?: string }

/**
 * Eventos do animal guardados em memória enquanto a página estiver aberta:
 * criar, editar e excluir alteram o que a busca e o GET devolvem. O seed não
 * guarda o animal dono, então vale para qualquer animal (com o `animalId` da
 * rota, como a API devolve); o que for criado fica só no animal da rota.
 */
export function createEventMockStore<TRecord extends { id: string }>(
  seed: TRecord[]
) {
  const records: Owned<TRecord>[] = seed.map((record) => ({ record }))

  function visible(animalId: string) {
    return records.filter(
      (owned) => owned.animalId === undefined || owned.animalId === animalId
    )
  }

  function withAnimalId(record: TRecord, animalId: string) {
    return { ...record, animalId }
  }

  function findOwned(animalId: string, id: string) {
    return visible(animalId).find(({ record }) => record.id === id)
  }

  return {
    list(animalId: string) {
      return visible(animalId).map(({ record }) =>
        withAnimalId(record, animalId)
      )
    },

    find(animalId: string, id: string) {
      const owned = findOwned(animalId, id)
      return owned ? withAnimalId(owned.record, animalId) : undefined
    },

    create(animalId: string, data: Omit<TRecord, 'id'>) {
      const record = { ...data, id: crypto.randomUUID() } as TRecord
      records.push({ record, animalId })
      return withAnimalId(record, animalId)
    },

    update(animalId: string, id: string, data: Omit<TRecord, 'id'>) {
      const owned = findOwned(animalId, id)
      if (!owned) return undefined

      owned.record = { ...data, id } as TRecord
      return withAnimalId(owned.record, animalId)
    },

    remove(animalId: string, id: string) {
      const owned = findOwned(animalId, id)
      if (!owned) return false

      records.splice(records.indexOf(owned), 1)
      return true
    },
  }
}
