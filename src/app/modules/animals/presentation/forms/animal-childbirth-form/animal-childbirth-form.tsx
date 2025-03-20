import { CreateAnimalChildbirthForm } from './create-animal-childbirth-form'
import { EditAnimalChildbirthForm } from './edit-animal-childbirth-form'

type AnimalChildbirthFormProps = {
  id?: string
}

export function AnimalChildbirthForm({ id }: AnimalChildbirthFormProps) {
  if (id) {
    return <EditAnimalChildbirthForm />
  }

  return <CreateAnimalChildbirthForm />
}

AnimalChildbirthForm.displayName = 'AnimalChildbirthForm'
