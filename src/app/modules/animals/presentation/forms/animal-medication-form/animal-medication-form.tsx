import { CreateAnimalMedicationForm } from './create-animal-medication-form'
import { EditAnimalMedicationForm } from './edit-animal-medication-form'

type AnimalMedicationFormProps = {
  id?: number
}

export function AnimalMedicationForm({
  id,
}: Readonly<AnimalMedicationFormProps>) {
  if (id) {
    return <EditAnimalMedicationForm />
  }

  return <CreateAnimalMedicationForm />
}

AnimalMedicationForm.displayName = 'AnimalMedicationForm'
