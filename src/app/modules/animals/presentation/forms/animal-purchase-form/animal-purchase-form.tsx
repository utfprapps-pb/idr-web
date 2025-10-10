import { CreateAnimalPurchaseForm } from './create-animal-purchase-form'
import { EditAnimalPurchaseForm } from './edit-animal-purchase-form'

type AnimalPurchaseFormProps = {
  id?: number
}

export function AnimalPurchaseForm({ id }: Readonly<AnimalPurchaseFormProps>) {
  if (id) {
    return <EditAnimalPurchaseForm />
  }

  return <CreateAnimalPurchaseForm />
}

AnimalPurchaseForm.displayName = 'AnimalPurchaseForm'
