import { CreateCultivationDiseaseForm } from './create-cultivation-disease-form'
import { EditCultivationDiseaseForm } from './edit-cultivation-disease-form'

type CultivationDiseaseFormProps = {
  id?: number
}

export function CultivationDiseaseForm({
  id,
}: Readonly<CultivationDiseaseFormProps>) {
  if (id) {
    return <EditCultivationDiseaseForm />
  }

  return <CreateCultivationDiseaseForm />
}

CultivationDiseaseForm.displayName = 'CultivationDiseaseForm'
