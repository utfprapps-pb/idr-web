/** O seed não guarda o animal dono: o mock usa o `animalId` da rota, como a API devolve. */
export function withAnimalId<TRecord extends object>(
  record: TRecord,
  animalId: string
): TRecord & { animalId: string } {
  return { ...record, animalId }
}
