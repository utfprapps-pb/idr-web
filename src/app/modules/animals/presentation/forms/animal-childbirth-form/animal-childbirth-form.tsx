import { CreateAnimalChildBirthForm } from './create-animal-childbirth-form'
import { EditAnimalChildBirthForm } from './edit-animal-childbirth-form'

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
