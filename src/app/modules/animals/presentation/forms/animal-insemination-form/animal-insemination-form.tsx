import { CreateAnimalInseminationForm } from './create-animal-insemination-form'
import { EditAnimalInseminationForm } from './edit-animal-insemination-form'

type AnimalInseminationFormProps = {
  id?: number
}

export function AnimalInseminationForm({
  id,
}: Readonly<AnimalInseminationFormProps>) {
  if (id) {
    return <EditAnimalInseminationForm />
  }

  return <CreateAnimalInseminationForm />
}

AnimalInseminationForm.displayName = 'AnimalInseminationForm'
