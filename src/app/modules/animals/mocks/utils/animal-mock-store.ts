import type {
  AnimalApiResponse,
  AnimalCreateApiRequest,
  AnimalUpdateApiRequest,
} from '../../domain/models/animals-model'

/** Animal como o seed grava (sem os campos que a API resolve na leitura). */
export type AnimalSeed = {
  id: string
  identifier: string
  breedId: string
  sizeId: string | null
  gender: string | null
  bornCondition: string | null
  bornDate: string | null
  bornWeight: number | null
  animalMotherId: string | null
  currentWeight: number | null
  ecc: number | null
}

type AnimalRecord = AnimalSeed & { previousWeight: number | null }

/** Resposta do POST/PUT da API (`CreateAnimalResponse`/`UpdateAnimalResponse`): sem `breedName`, `sizeName` nem `animalMotherIdentifier`. */
export type AnimalSavedApiResponse = Omit<
  AnimalApiResponse,
  'breedName' | 'sizeName' | 'animalMotherIdentifier'
>

/** Referência informada que o catálogo não conhece (a API responde 400); nula é aceita. */
export function isUnknownReference(
  id: string | null,
  findName: (id: string) => string | null
): boolean {
  return id != null && findName(id) === null
}

/**
 * Rebanho guardado em memória enquanto a página estiver aberta: criar,
 * editar e excluir alteram o que a busca e o GET devolvem. O GET resolve
 * `breedName`, `sizeName` e `animalMotherIdentifier` a cada leitura (renomear a mãe
 * aparece na filha). Pesos e ECC não fazem parte do PUT e são mantidos.
 */
export function createAnimalMockStore(
  seed: AnimalSeed[],
  findBreedName: (breedId: string) => string | null,
  findSizeName: (sizeId: string) => string | null
) {
  const records: AnimalRecord[] = seed.map((animal) => ({
    ...animal,
    previousWeight: null,
  }))

  function findRecord(id: string) {
    return records.find((record) => record.id === id)
  }

  function toSaved(
    record: AnimalRecord,
    propertyId: string
  ): AnimalSavedApiResponse {
    return {
      id: record.id,
      propertyId,
      animalMotherId: record.animalMotherId,
      breedId: record.breedId,
      sizeId: record.sizeId,
      identifier: record.identifier,
      gender: record.gender,
      bornCondition: record.bornCondition,
      bornDate: record.bornDate,
      bornWeight: record.bornWeight,
      previousWeight: record.previousWeight,
      currentWeight: record.currentWeight,
      ecc: record.ecc,
    }
  }

  function toApiResponse(
    record: AnimalRecord,
    propertyId: string
  ): AnimalApiResponse {
    const mother = record.animalMotherId
      ? findRecord(record.animalMotherId)
      : undefined

    return {
      ...toSaved(record, propertyId),
      breedName: findBreedName(record.breedId),
      sizeName: record.sizeId ? findSizeName(record.sizeId) : null,
      animalMotherIdentifier: mother?.identifier ?? null,
    }
  }

  /** Só os campos do request: o que mais vier no corpo é ignorado, como na API. */
  function identification(body: AnimalCreateApiRequest) {
    return {
      identifier: body.identifier,
      breedId: body.breedId,
      sizeId: body.sizeId,
      gender: body.gender,
      animalMotherId: body.animalMotherId,
      bornDate: body.bornDate,
      bornWeight: body.bornWeight,
      bornCondition: body.bornCondition,
    }
  }

  return {
    list(propertyId: string) {
      return records.map((record) => toApiResponse(record, propertyId))
    },

    find(propertyId: string, id: string) {
      const record = findRecord(id)
      return record ? toApiResponse(record, propertyId) : undefined
    },

    create(propertyId: string, body: AnimalCreateApiRequest) {
      const record: AnimalRecord = {
        id: crypto.randomUUID(),
        ...identification(body),
        previousWeight: null,
        currentWeight: null,
        ecc: null,
      }
      records.push(record)
      return toSaved(record, propertyId)
    },

    update(propertyId: string, id: string, body: AnimalUpdateApiRequest) {
      const record = findRecord(id)
      if (!record) return undefined

      Object.assign(record, identification(body))
      return toSaved(record, propertyId)
    },

    remove(id: string) {
      const record = findRecord(id)
      if (!record) return false

      records.splice(records.indexOf(record), 1)
      return true
    },
  }
}
