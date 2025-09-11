import { CreateAnimalChildbirthForm } from './create-animal-childbirth-form'
import { EditAnimalChildbirthForm } from './edit-animal-childbirth-form'

type AnimalChildbirthFormProps = {
  id?: number
}

export function AnimalChildbirthForm({
  id,
}: Readonly<AnimalChildbirthFormProps>) {
  if (id) {
    return <EditAnimalChildbirthForm />
  }

  return <CreateAnimalChildbirthForm />
}

AnimalChildbirthForm.displayName = 'AnimalChildbirthForm'
