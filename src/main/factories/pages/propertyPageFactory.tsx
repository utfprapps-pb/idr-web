import { PropertyPage } from '@/presentation/pages/propertyPage'

import {
	makeRemoteCreateProperty,
	makeRemoteDeleteProperty,
	makeRemoteGetProperties,
	makeRemoteGetProperty,
	makeRemoteUpdateProperty
} from '../useCases/property'
import { makeRemoteGetAllUsers } from '../useCases/user'
import { makePropertyValidation } from '../validations/propertyValidationFactory'

export const MakePropertyPage: React.FC = () => (
	<PropertyPage
		createProperty={makeRemoteCreateProperty()}
		updateProperty={makeRemoteUpdateProperty()}
		deleteProperty={makeRemoteDeleteProperty()}
		getProperties={makeRemoteGetProperties()}
		getProperty={makeRemoteGetProperty()}
		getAllUsers={makeRemoteGetAllUsers()}
		validation={makePropertyValidation()}
	/>
)
