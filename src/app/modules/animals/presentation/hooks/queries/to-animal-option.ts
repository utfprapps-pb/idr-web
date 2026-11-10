import type { AnimalModel } from '@/app/modules/animals/domain/models/animals-model'

/** `toOption()` força `value: number`; o id do animal é um UUID (string). */
export function toAnimalOption(animal: AnimalModel) {
  return {
    label: animal.name,
    value: animal.id,
    extraData: {
      breed: animal.breed,
      weight: animal.weight,
      ecc: animal.ecc,
      milkProduction: animal.milkProduction,
    },
  }
}
