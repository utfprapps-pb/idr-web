import { CreateAnimalChildBirthForm } from './create-animal-child-birth-form'
import { EditAnimalChildBirthForm } from './edit-animal-child-birth-form'

type AnimalChildBirthFormProps = {
  id?: string
}

export function AnimalChildBirthForm({ id }: AnimalChildBirthFormProps) {
  if (id) {
    return <EditAnimalChildBirthForm />
  }

  return <CreateAnimalChildBirthForm />
}

AnimalChildBirthForm.displayName = 'AnimalChildBirthForm'
