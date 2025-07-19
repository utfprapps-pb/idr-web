import { CreateAnimalDiseaseForm } from './create-animal-disease-form'
import { EditAnimalDiseaseForm } from './edit-animal-disease-form'

type AnimalDiseaseFormProps = {
  id?: number
}

export function AnimalDiseaseForm({ id }: Readonly<AnimalDiseaseFormProps>) {
  if (id) {
    return <EditAnimalDiseaseForm />
  }

  return <CreateAnimalDiseaseForm />
}

AnimalDiseaseForm.displayName = 'AnimalDiseaseForm'
