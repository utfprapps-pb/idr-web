import { CreatePropertyForm } from './createPropertyForm'
import { EditPropertyForm } from './editPropertyForm'

type PropertyFormProps = {
	id?: string
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ id }) => {
	if (id) {
		return <EditPropertyForm />
	}

	return <CreatePropertyForm />
}
