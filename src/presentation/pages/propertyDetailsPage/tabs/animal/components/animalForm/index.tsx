import { CreateAnimalForm } from './createAnimalForm'
import { EditAnimalForm } from './editAnimalForm'

type AnimalFormProps = {
  id?: string
}

export const AnimalForm: React.FC<AnimalFormProps> = ({ id }) => {
  if (id) {
    return <EditAnimalForm />
  }

  return <CreateAnimalForm />
}
