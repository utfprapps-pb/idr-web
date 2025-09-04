import { CreateAnimalDeathForm } from './create-animal-death-form'
import { EditAnimalDeathForm } from './edit-animal-death-form'

type AnimalDeathFormProps = {
  id?: number
}

export function AnimalDeathForm({ id }: Readonly<AnimalDeathFormProps>) {
  if (id) {
    return <EditAnimalDeathForm />
  }

  return <CreateAnimalDeathForm />
}

AnimalDeathForm.displayName = 'AnimalDeathForm'
