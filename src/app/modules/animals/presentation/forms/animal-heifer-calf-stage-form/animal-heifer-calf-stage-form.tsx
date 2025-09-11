import { CreateAnimalHeiferCalfStageForm } from './create-animal-heifer-calf-stage-form'
import { EditAnimalHeiferCalfStageForm } from './edit-animal-heifer-calf-stage-form'

type AnimalHeiferCalfStageFormProps = {
  id?: number
}

export function AnimalHeiferCalfStageForm({
  id,
}: Readonly<AnimalHeiferCalfStageFormProps>) {
  if (id) {
    return <EditAnimalHeiferCalfStageForm />
  }

  return <CreateAnimalHeiferCalfStageForm />
}

AnimalHeiferCalfStageForm.displayName = 'AnimalHeiferCalfStageForm'
