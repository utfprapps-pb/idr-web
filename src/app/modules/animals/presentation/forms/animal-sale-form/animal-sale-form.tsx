import { CreateAnimalSaleForm } from './create-animal-sale-form'
import { EditAnimalSaleForm } from './edit-animal-sale-form'

type AnimalSaleFormProps = {
  id?: number
}

export function AnimalSaleForm({ id }: Readonly<AnimalSaleFormProps>) {
  if (id) {
    return <EditAnimalSaleForm />
  }

  return <CreateAnimalSaleForm />
}

AnimalSaleForm.displayName = 'AnimalSaleForm'
