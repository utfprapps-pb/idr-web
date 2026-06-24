import { CreateRegionForm } from './create-region-form'
import { EditRegionForm } from './edit-region-form'

type RegionFormProps = {
  readonly id?: string
}

export function RegionForm({ id }: RegionFormProps) {
  if (id) {
    return <EditRegionForm />
  }

  return <CreateRegionForm />
}

RegionForm.displayName = 'RegionForm'
