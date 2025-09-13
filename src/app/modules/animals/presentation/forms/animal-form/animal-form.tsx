import { CreateAnimalForm } from './create-animal-form'
import { EditAnimalForm } from './edit-animal-form'

type AnimalFormProps = {
  id?: number
}

export function AnimalForm({ id }: Readonly<AnimalFormProps>) {
  if (id) {
    return <EditAnimalForm />
  }

  return <CreateAnimalForm />
}

AnimalForm.displayName = 'AnimalForm'
