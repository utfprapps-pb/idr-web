import { CreateAnimalPregnancyDiagnosisForm } from './create-animal-pregnancy-diagnosis-form'
import { EditAnimalPregnancyDiagnosisForm } from './edit-animal-pregnancy-diagnosis-form'

type AnimalPregnancyDiagnosisFormProps = {
  id?: string
}

export function AnimalPregnancyDiagnosisForm({
  id,
}: Readonly<AnimalPregnancyDiagnosisFormProps>) {
  if (id) {
    return <EditAnimalPregnancyDiagnosisForm />
  }

  return <CreateAnimalPregnancyDiagnosisForm />
}

AnimalPregnancyDiagnosisForm.displayName = 'AnimalPregnancyDiagnosisForm'
