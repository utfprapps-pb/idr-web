import { CreateAnimalMastitisForm } from './create-animal-mastitis-form'
import { EditAnimalMastitisForm } from './edit-animal-mastitis-form'

type AnimalMastitisFormProps = {
  id?: number
}

export function AnimalMastitisForm({ id }: Readonly<AnimalMastitisFormProps>) {
  if (id) {
    return <EditAnimalMastitisForm />
  }

  return <CreateAnimalMastitisForm />
}

AnimalMastitisForm.displayName = 'AnimalMastitisForm'
