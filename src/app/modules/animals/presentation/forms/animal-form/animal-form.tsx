import { CreateAnimalForm } from './create-animal-form'
import { EditAnimalForm } from './edit-animal-form'

type AnimalFormProps = {
  id?: string
}

export function AnimalForm({ id }: AnimalFormProps) {
  if (id) {
    return <EditAnimalForm />
  }

  return <CreateAnimalForm />
}

AnimalForm.displayName = 'AnimalForm'
