import { CreateAnimalDiseaseForm } from './create-animal-disease-form'
import { EditAnimalDiseaseForm } from './edit-animal-disease-form'

type AnimalDiseaseFormProps = {
  id?: string
}

export function AnimalDiseaseForm({ id }: AnimalDiseaseFormProps) {
  if (id) {
    return <EditAnimalDiseaseForm />
  }

  return <CreateAnimalDiseaseForm />
}

AnimalDiseaseForm.displayName = 'AnimalDiseaseForm'
