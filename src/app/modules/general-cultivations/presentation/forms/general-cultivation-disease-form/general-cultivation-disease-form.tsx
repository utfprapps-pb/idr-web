import { CreateGeneralCultivationDiseaseForm } from './create-general-cultivation-disease-form'
import { EditGeneralCultivationDiseaseForm } from './edit-general-cultivation-disease-form'

type GeneralCultivationDiseaseFormProps = {
  id?: number
}

export function GeneralCultivationDiseaseForm({
  id,
}: Readonly<GeneralCultivationDiseaseFormProps>) {
  if (id) {
    return <EditGeneralCultivationDiseaseForm />
  }

  return <CreateGeneralCultivationDiseaseForm />
}

GeneralCultivationDiseaseForm.displayName = 'GeneralCultivationDiseaseForm'
